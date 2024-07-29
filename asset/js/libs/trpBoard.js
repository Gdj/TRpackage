jQuery.fn.trpSortTable = function(){
  var sort_th = $("th.table_sort" , this);
  var sortOrder = 1;

  sort_th.on("click", function() {
    var rows = sortRows(this);
    rebuildTbody(rows);
    updateClassName(this);
    sortOrder *= -1;     // 1:sortDown , -1:sortUp
  })

  function sortRows(th) {
    var rows = $.makeArray($('tbody > tr'));
    var col = th.cellIndex;
    var type = th.dataset.type;
    rows.sort(function(a, b) {
      return compare(a, b, col, type) * sortOrder;      
    });
    return rows;
  }

  function compare(a, b, col, type) {
    var _a = a.children[col].textContent;
    var _b = b.children[col].textContent;
    if (type === "number") {
      _a *= 1;
      _b *= 1;
    } else if (type === "string") {
      //全て小文字に揃えている。toLowerCase()
      _a = _a.toLowerCase();
      _b = _b.toLowerCase();
    }

    if (_a < _b) {
      return -1;
    }
    if (_a > _b) {
      return 1;
    }
    return 0;
  }

  function rebuildTbody(rows) {
    var tbody = $("tbody");
    while (tbody.firstChild) {
      tbody.remove(tbody.firstChild);
    }

    var j;
    for (j=0; j<rows.length; j++) {
      tbody.append(rows[j]);
    }
  }

  function updateClassName(th) {
		$(sort_th).removeClass("sort_up sort_dw");
		if(sortOrder === 1){
			$(th).addClass("sort_dw");
		}else{
			$(th).addClass("sort_up");
		}
  }
  

}