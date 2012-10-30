sortberg
========
_Need to sort a table? Why not sortberg?_

sortberg is a very simple jquery plugin for sorting tables. It automatically selects the appropriate sorting method (either string or number comparison).

Example
-------
Add the javascript files

	<script type="text/javascript" src="jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="jquery.sortberg.js"></script>
	
Create a table

	<table>
		<thead>
			<tr><th>Name</th><th>Score</th><th>Health</th></tr>
		</thead>
		<tbody>
			<tr><td>Bob</td><td>2138</td><td>23.54%</td></tr>
			<tr><td>Alice</td><td>338</td><td>39%</td></tr>
			<tr><td>Jack</td><td>999999</td><td>2%</td></tr>
			<tr><td>Gordon</td><td>3592</td><td>78.89%</td></tr>
			<tr><td>James</td><td>34893</td><td>96.2%</td></tr>
			<tr><td>Alex</td><td>2132438</td><td>100%</td></tr>
		</tbody>
	</table>
	
Enable sortberg

	$('table').sortberg();
	
Clicking the headers changes the sorting and adds the css class sort-desc or sort-asc depending on the current sorting.