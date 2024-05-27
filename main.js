function start_btn() {
    document.getElementById("start_img").style.display = 'none';
    document.getElementById("start_btn").style.display = 'none';
    document.getElementById("order_bar").style.display = 'block';
    document.getElementById("menu_table").style.display = 'block';
    document.getElementById("nextpage").style.display = 'flex';
    document.getElementById("pay").style.display = 'flex';
    hide_order_list();
    open_menu_table("인기메뉴");
}

function hide_order_list() {
    var list = document.getElementsByClassName("cart");
    for (i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
}

function herf_home() {
    location.href = "index.html";

}

function show_help() {
    const modal = document.querySelector('.help');
    modal.style.display="flex";

}

function close_help() {
    const modal = document.querySelector('.help');
    modal.style.display="none";

}


// 메뉴 테이블
var menu_list = ["인기메뉴"];
function open_menu_table(title) {
    all_menu_none(); // 모든 메뉴를 숨김

    // 선택한 메뉴에 해당하는 테이블만 표시
    var menuTable = document.getElementById(title);
    if (menuTable) {
        menuTable.style.display = 'block';
    }
}

function all_menu_none() {
    document.getElementById("인기메뉴").style.display = 'none';
    document.getElementById("커피").style.display = 'none';
    document.getElementById("논커피").style.display = 'none';
    document.getElementById("디저트").style.display = 'none';
    document.getElementById("MD상품").style.display = 'none';
}

var menu_bar_page = 1;

// 페이지 로드 시 초기 상태 설정
document.addEventListener("DOMContentLoaded", function() {
    // 모든 메뉴 항목을 숨김
    var menuItems = document.querySelectorAll(".menu_1, .menu_2");
    menuItems.forEach(function(item) {
        item.style.display = "none";
    });

    // 첫 번째 페이지에 해당하는 메뉴 항목들을 보이게 설정
    var firstPageItems = document.querySelectorAll(".menu_1");
    firstPageItems.forEach(function(item) {
        item.style.display = "block";
    });
});


function turn_menu_page(btn) {
    var current_page_id = "menu_";
    var currentPageClass = "";
    if (btn == "menu_bar_right") {
        if (menu_bar_page != 2) {
            // 기존 페이지 숨기기
            currentPageClass = (menu_bar_page == 1) ? "menu_1" : "menu_2";
            var past = document.getElementsByClassName(currentPageClass);
            for (var i = 0; i < past.length; i++) {
                past[i].style.display = 'none';
            }
            
            menu_bar_page += 1;
        }
    }

    if (btn == "menu_bar_left") {
        if (menu_bar_page != 1) {
            // 기존 페이지 숨기기
            currentPageClass = (menu_bar_page == 2) ? "menu_2" : "menu_1";
            var past = document.getElementsByClassName(currentPageClass);
            for (var i = 0; i < past.length; i++) {
                past[i].style.display = 'none';
            }
            
            menu_bar_page -= 1;
        }
    }
    
    // 현재 페이지 보이기
    var nowClass = current_page_id + menu_bar_page;
    var now = document.getElementsByClassName(nowClass);
    for (var i = 0; i < now.length; i++) {
        now[i].style.display = 'block';
    }
}

function Item(name, price) {
    this.name = name;
    this.number = 0;
    this.price = parseInt(price);
}

var order_list = [];

function option(id, type, price) {
    var drink = document.getElementById(id);
    drink.style.borderStyle = 'solid';
    drink.style.borderColor = 'red';

    var order = new Item(id, price);
    order.number += 1;

    var cnt = 0;
    for (var i = 0; i < order_list.length; i++) {
        if (order.name == order_list[i].name) {
            order_list[i].number += 1;
            cnt += 1;
        }
    }
    if (cnt == 0 || order_list.length == 0) {
        order_list.push(order);
    }

    open_order_list(order_list);

    if (type == "no_option") {
        /**/
    }
}

function delete_item(index) {
    var deletedDrink = order_list[index].name;
    order_list.splice(index, 1);
    open_order_list(order_list);

    // 삭제된 드링크의 border 스타일 제거
    var deletedDrinkElement = document.getElementById(deletedDrink);
    if (deletedDrinkElement) {
        deletedDrinkElement.style.borderStyle = 'none';
    }
}

/*order_list에 표시하기*/
var total_list = [0, 0];
function open_order_list(order_list) {
    var orderListContainer = document.getElementById('order_list');
    orderListContainer.innerHTML = ''; // Clear existing order items

    var total_num = 0;
    var total_price = 0;

    order_list.forEach((order, i) => {
        var orderElement = createOrderItemElement(order, i);
        orderListContainer.appendChild(orderElement);

        total_num += order.number;
        total_price += order.price * order.number;
    });

    document.getElementById("item_number").innerHTML = "선택한 상품 " + total_num + "개";
    document.getElementById("total_price").innerHTML = total_price + "원";
}

function createOrderItemElement(order, index) {
    var orderDiv = document.createElement('div');
    orderDiv.className = 'cart';

    var deleteDiv = document.createElement('div');
    deleteDiv.innerText = 'X';
    deleteDiv.onclick = function () {
        delete_item(index);
    };
    deleteDiv.className ='delete'

    var rangeDiv = document.createElement('div');
    rangeDiv.innerText = `${index + 1}. ${order.name}`;

    var minusDiv = document.createElement('div');
    minusDiv.innerText = '-';
    minusDiv.onclick = function () {
        if (order.number > 1) {
            order.number -= 1;
            open_order_list(order_list);
        }
    };
    minusDiv.className = 'minus';

    var amountDiv = document.createElement('div');
    amountDiv.innerText = `${order.number}개`;

    var plusDiv = document.createElement('div');
    plusDiv.innerText = '+';
    plusDiv.onclick = function () {
        order.number += 1;
        open_order_list(order_list);
    };
    plusDiv.className ='plus'

    var itemPriceDiv = document.createElement('div');
    itemPriceDiv.innerText = `${order.price * order.number}원`;

    orderDiv.appendChild(deleteDiv);
    orderDiv.appendChild(rangeDiv);
    orderDiv.appendChild(plusDiv);
    orderDiv.appendChild(amountDiv);
    orderDiv.appendChild(minusDiv);
    orderDiv.appendChild(itemPriceDiv);
    orderDiv.appendChild(document.createElement('br')); // 한 줄 엔터 추가
    return orderDiv;
}

function show_cart() {
    const cmodal = document.querySelector('#cart_modal');
    cmodal.style.display = "flex";
}

function close_cart() {
    const cmodal = document.querySelector('#cart_modal');
    cmodal.style.display = "none";
}

function 결제버튼(){
    alert("키오스크 체험이 완료되었습니다. 참여해주셔서 감사합니다.")
    location.href ="index.html"
}
