function getAllProduct() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products',
        success: function (products) {
            let content = '';
            for (let i = 0; i < products.length; i++) {
                content += ` <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].description}</td>
            <td><img src="http://localhost:8080/image/${products[i].image}"></td>
            <td>${products[i].category == null? '': products[i].category.name}</td>
            <td><button class="btn btn-primary"data-toggle="modal"
                                        data-target="#input-product" onclick="showEditForm(${products[i].id})"><i class="fa fa-edit"></i></button></td>
            <td><button class="btn btn-danger" data-toggle="modal"
                                        data-target="#delete-product" onclick="showDeleteForm(${products[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
            }
            $('#product-list-content').html(content);
        }
    })
}
function showCreateForm(id){
    let tittle = 'Tạo mới sản phẩm';
    $('#create-product-tittle').html(tittle)
    let content = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" onclick="createNewProduc(${id})" aria-label="Close" class="close" data-dismiss="modal">Tạo mới</button>`;
    $('#footer-create').html(content)
    $('#name').val('')
    $('#price').val('')
    $('#description').val('')
    $('#image').val('')
    $('#category').val('')
    drawCategory()
}
function createNewProduc() {
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let image = $('#image').val();
    let category = $('#category').val();
    let product = {
        name: name,
        price: price,
        description: description,
        image: image,
        category: {
            id:category
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products',
        data: JSON.stringify(product),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllProduct()
            showSuccessMessage('Tao moi thanh cong')
        },
        error: function (){
            showErrorMessage("Tao moi that bai")
        }
    })
}

function showSuccessMessage(message){
    $(function() {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'success',
            title: message
        })
    });
}

function showErrorMessage(message){
    $(function() {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    });
}
function showDeleteForm(id){
    let content = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct(${id})" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#footer-delete').html(content)
}

function deleteProduct(id){
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/products/${id}`,
        success: function (){
            getAllProduct()
            showSuccessMessage('Xoa thanh cong')
        },
        error: function (){
            showErrorMessage('Xoa that bai')
        }
    })
}
function showEditForm(id){
    let tittle = 'Chỉnh sửa  thông thin sản phẩm';
    $('#create-product-tittle').html(tittle)
    let content = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" onclick="editProduct(${id})" aria-label="Close" class="close" data-dismiss="modal">Cập nhật</button>`;
    $('#footer-create').html(content)
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/products/${id}`,
        success: function (product){
            $('#name').val(product.name);
            $('#price').val(product.price);
            $('#description').val(product.description);
            $('#image').val(product.image)
            $('#category').html(product.category);
            drawCategory();
        }
    })
}
function editProduct(id){
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let image = $('#image').val();
    let category = $('#category').val();
    let product = {
        name: name,
        price: price,
        description: description,
        image: image,
        category: {
            id:category
        }
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(product),

        success: function (){
            getAllProduct()
            showSuccessMessage('Cập nhật thành công')
        },
        error: function (){
            showErrorMessage('Cập nhật thất bại')
        }
    })
}
function drawCategory(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories',
        success: function (categories){
            let content = `<option selected disabled>Chọn danh mục sản phẩm</option>`
            for (let category of categories) {
                content += `<option value="${category.id}">${category.name}</option>`
            }
            $('#category').html(content)
        }
    })
}
$(document).ready(function () {
    getAllProduct()
})