(function($)
{
	$.fn.sortberg = function(params)
	{
		var $this = $(this);
		
		var comparators = {};
		comparators.text = function($a, $b)
		{
			if ($a.text() < $b.text()) return -1;
			if ($a.text() > $b.text()) return 1;
			return 0;
		};
		
		comparators.number = function($a, $b)
		{
			return parseFloat($a.text())-parseFloat($b.text());
		};
		
		$this.on('click', 'th', function(e)
		{
			var $self = $(this);
			var idx = $(this).index();
			var rows = $this.find('tbody tr').get();
			var comparator;
			
			rows.sort(function(a, b)
			{
				$a = $(a).children('td').eq(idx);
				$b = $(b).children('td').eq(idx);
				
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
			$this.find('tbody').append(rows);
		});
	}
})(jQuery);