(function($) {

  $.fn.pickList = function(options) {

    var self = this;

    var opts = $.extend({}, $.fn.pickList.defaults, options);

    var wrapper = $('<div />')
        .addClass(opts.wrapperClass)
        .appendTo(opts.container);

    function List(classes) {

      var self = this;

      this.items = [];

      this.elmt = $('<select />')
          .attr('multiple', 'multiple')
          .addClass('mai-picklist-list ' + classes);

      this.addItem = function(item) {
        var itemElmt = $('<option />')
            .attr('value', item[opts.columnItemValue])
            .text(item[opts.columnItemText]);
        self.elmt.append(itemElmt);
        self.items.push(item);
        return self.items;
      };

      this.removeItem = function(item) {
        var index = self.items.indexOf(item);
        if (index != -1) {
          self.items.splice(index, 1);
        }
        return self.items;
      };

    };

    function Control(name, container) {
      var elmt = $('<button />')
        .addClass(opts.controlButtonClass)
        .appendTo(container)
        .text(name);

      return elmt;
    };

    function moveSelected(listA, listB) {
      var selectedOptions = listA.find('option:selected');
      selectedOptions.appendTo(listB);
      for (var iterator = 0; iterator < selectedOptions; iterator++) {
        listA.removeItem(selectedOptions[iterator]);
      }
      listB.find('option:selected').prop('selected', false);
    };

    function moveAll(listA, listB) {
      var options = listA.find('option');
      options.appendTo(listB);
      listA.items = [];
    }

    this.leftList  = new List(opts.leftListClass);
    this.rightList = new List(opts.rightListClass);

    this.leftColumn = $('<div />')
          .addClass(opts.leftColumnClass);

    this.middleColumn = $('<div />')
          .addClass(opts.controlColumnClass);

    this.rightColumn = $('<div />')
          .addClass(opts.rightColumnClass);

    this.addBtn = new Control('Add >', this.middleColumn);
    this.addBtn.on('click', function(e) {
      moveSelected(self.leftList.elmt, self.rightList.elmt);
    });

    this.addAllBtn = new Control('Add All >>', this.middleColumn);
    this.addAllBtn.on('click', function(e) {
      moveAll(self.leftList.elmt, self.rightList.elmt);
    });

    this.removeBtn = new Control('< Remove', this.middleColumn);
    this.removeBtn.on('click', function(e) {
      moveSelected(self.rightList.elmt, self.leftList.elmt);
    });

    this.removeAllBtn = new Control('<< Remove All', this.middleColumn);
    this.removeAllBtn.on('click', function(e) {
      moveAll(self.rightList.elmt, self.leftList.elmt);
    });

    wrapper.append(this.leftColumn)
           .append(this.middleColumn)
           .append(this.rightColumn);

    this.leftColumn.append(this.leftList.elmt);
    this.rightColumn.append(this.rightList.elmt);

    for (var iterator = 0; iterator < opts.leftListData.length; iterator++) {
      this.leftList.addItem(opts.leftListData[iterator]);
    }

    for (var iterator = 0; iterator < opts.rightListData.length; iterator++) {
      this.rightList.addItem(opts.rightListData[iterator]);
    }

    return this;
  };

  $.fn.pickList.defaults = {
    container: 'body',
    wrapperClass: 'mai-picklist-wrapper',
    leftColumnClass: 'col-left',
    controlColumnClass: 'col-middle',
    rightColumnClass: 'col-right',
    controlButtonClass: 'mai-picklist-btn',
    leftListClass: 'mai-picklist-leftlist',
    leftListData: [],
    rightListData: [],
    rightListClass: 'mai-picklist-rightlist',
    columnItemValue: 'id',
    columnItemText: 'text'
  };

}(jQuery));
