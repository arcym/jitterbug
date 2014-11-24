var HelloMessage = React.createClass(
{
	render: function()
	{
		return <div>Hello {this.props.name}</div>;
	}
});

React.render(<HelloMessage name="Andrew" />, $("#game > #content").get(0));