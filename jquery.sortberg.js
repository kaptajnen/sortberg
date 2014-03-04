(function($)
{
	$.fn.sortberg = function(params)
	{
		var $this = $(this);
		var options = params || {};
		var defaults = {groupClass: 'details'};
		options = $.extend(defaults, options);
		
		var comparators = {};
		comparators.text = function($a, $b)
		{
			if ($a.text() < $b.text()) return -1;
			if ($a.text() > $b.text()) return 1;
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
			var idx = $(this).index();
			var rows = [];
			var comparator;

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

		return this;
	}
})(jQuery);