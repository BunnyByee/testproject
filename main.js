function start_btn() {
    document.getElementById("start_img").style.display = 'none';
    document.getElementById("start_btn").style.display = 'none';
    document.getElementById("order_bar").style.display = 'block';
    document.getElementById("menu_table").style.display = 'block';
    document.getElementById("nextpage").style.display = 'flex';
    document.getElementById("pay").style.display = 'flex';
    hide_order_list();

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
    var menuTables = document.querySelectorAll("#menu_table > div");
    menuTables.forEach(function(table) {
        table.style.display = 'none';
    });
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
    this.price = parseInt(price)
}

var order_list = [];
function option(id, type, price) {
    var drink = document.getElementById(id);
    drink.style.borderStyle = 'solid';
    drink.style.borderColor = 'red';

    var order = new Item(id, price);
    order.number += 1;

    var cnt = 0;
    for (i = 0; i < order_list.length; i++) {
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
    order_list = order_list.splice(index, 1);
    open_order_list(order_list);
}

/*order_list에 표시하기*/
var total_list= [0, 0];
function open_order_list(order_list) {
    var total_num = 0;
    var total_price = 0;

    for (i = 0; i < order_list.length; i++) {
        var order_id = "order_" + (i + 1);
        document.getElementById(order_id).style.display = 'flex';

        document.getElementById("range_" + (i + 1)).innerText = (i + 1) + ". " + (order_list[i].name);
        document.getElementById("amount_" + (i + 1)).innerText = (order_list[i].number) + "개";
        document.getElementById("item_price_" + (i + 1)).innerText = (order_list[i].price) * (order_list[i].number) + "원";
        
        total_num += order_list[i].number;
        total_price += (order_list[i].price)*(order_list[i].number);
    }
    document.getElementById("item_number").innerHTML= "_________________________<br>선택한 상품 " + (total_num) + "개";
    document.getElementById("total_price").innerHTML = (total_price)+"원<br>결제하기";
    total_list[0] = total_num;
    total_list[1] = total_price;

}

// 페이지 로드 시 초기 상태 설정
document.addEventListener("DOMContentLoaded", function() {
    // 모든 메뉴 테이블을 숨깁니다.
    var allMenuTables = document.querySelectorAll(".menu_table");
    allMenuTables.forEach(function(table) {
        table.style.display = "none";
    });
    
    // 첫 번째 페이지에 해당하는 메뉴 항목들을 보이게 설정
    var firstPageItems = document.querySelectorAll(".menu_table.p1");
    firstPageItems.forEach(function(item) {
        item.style.display = "block";
    });

    // 첫 번째 페이지로 설정
    currentPage = 1;
});

// 다음 페이지로 이동하는 함수
function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
}

// 이전 페이지로 이동하는 함수
function goToPreviusPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
}

// 페이지 업데이트 함수
function updatePage() {
    // 모든 페이지를 숨깁니다.
    var allPages = document.querySelectorAll(".menu_table");
    allPages.forEach(function(page) {
        page.style.display = "none";
    });

    // 현재 페이지를 보여줍니다.
    var currentPageId = "인기메뉴_p" + currentPage;
    var currentPageElement = document.getElementById(currentPageId);
    if (currentPageElement) {
        currentPageElement.style.display = "block";
    }
}

function show_cart() {
    const cmodal = document.querySelector('#cart_modal');
    cmodal.style.display="flex";

}

function close_cart() {
    const cmodal = document.querySelector('#cart_modal');
    cmodal.style.display="none";

}
