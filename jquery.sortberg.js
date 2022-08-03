(function($)
{
	var getSortIndex = function(elem) {
		var extraColspan = 0;
		var extraRowspan = 0;

		// take colspan of columns to the left of this column into account
		$(elem).prevAll().each(function(idx) {
			var colspan = $(this).prop("colSpan");
			if (colspan) {
				extraColspan += colspan-1;
			}
		});

		// take rowspan of columns "above" into account by adding 1 for each rowspan column
		// until we have found maxCols non-rowspan columns (taking colspans into account too)
		var $prevRow = $(elem).parent().prev();
		var maxCols = $(elem).index() + 1;
		$prevRow.find("th").each(function(idx) {
			var rowspan = $(this).prop("rowSpan");
			var colspan = $(this).prop("colSpan");
			if (rowspan && rowspan > 1 && maxCols > 0) {
				extraRowspan += 1;
			} else {
				maxCols -= colspan;
			}
		});

		return $(elem).index() + extraColspan + extraRowspan;
	};

	$.fn.sortberg = function(params)
	{
		return this.each(function() {
			var $this = $(this);
			var options = params || {};
			var defaults = {groupClass: 'details', ignoreCase: false};
			options = $.extend(defaults, options);
			
			var comparators = {};
			comparators.text = function($a, $b)
			{
				var a = $a.text();
				var b = $b.text();

				if (options.ignoreCase) {
					a = a.toLowerCase();
					b = b.toLowerCase();
				}

				if (a < b) return -1;
				if (a > b) return 1;
				return 0;
			};
			
			comparators.number = function($a, $b)
			{
				var a = parseFloat($a.text());
				var b = parseFloat($b.text());
				if (isNaN(a)) { a = 0 }
				if (isNaN(b)) { b = 0 }
				
				return a - b;
			};
			
			$this.on('click', 'thead th', function(e)
			{
				var $self = $(this);
				var idx = getSortIndex(this);
				var rows = [];
				var comparator;

				// only sort if the th is clicked, not child elements inside the th
				if (e.target != this) {
					return;
				}

				// disable sorting on headers that span multiple columns since it wouldn't be clear what is being sorted
				if ($self.prop('colSpan') > 1) {
					return this;
				}

				$this.find('tbody tr').each(function()
				{
					if ($(this).hasClass(options.groupClass))
					{
						return true;
					}
					
					var details = $(this).nextUntil(':not(.' + options.groupClass + ')', 'tr').get();
					var row = {row: $(this).get(), details: details};

					rows.push(row);
				});

				if (options.comparator)
				{
					comparator = options.comparator;
				}
				else if ($(this).data('sorting'))
				{
					var sorting = $(this).data('sorting');
					comparator = comparators[sorting];
				}
				
				rows.sort(function(a, b)
				{
					$a = $(a.row).children('th,td').eq(idx);
					$b = $(b.row).children('th,td').eq(idx);
					
					if (! comparator)
					{
						if (isNaN(parseFloat($a.text())))
							comparator = comparators['text'];
						else
							comparator = comparators['number'];
					}
					
					var result = comparator($a, $b);
					
					//which direction should we sort in? if not currently sorted, we default to ascending
					if ($self.hasClass('sort-asc'))
					{
						return -result;
					}					
					else
					{
						return result;
					}
				});
				
				//set correct css class to currently sorted column
				if ($self.hasClass('sort-asc'))
				{
					$self.removeClass('sort-asc').addClass('sort-desc');
				}
				else
				{
					$self.removeClass('sort-desc').addClass('sort-asc');
				}
				
				//other columns are not sorted
				$this.find('th').not($self).removeClass('sort-desc').removeClass('sort-asc');
				
				//update the actual table
				for (var i = 0; i < rows.length; i++)
				{
					$this.find('tbody').append(rows[i].row);
					if (rows[i].details.length > 0)
					{
						$this.find('tbody').append(rows[i].details);
					}
				}
			});
		})
	}
})(jQuery);