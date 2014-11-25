var PointAndClickGame = React.createClass(
{
    render: function()
    {
        return (
            <div id="game">
                <div id="screen">
                </div>
                <div id="menu">
                    <div id="items">
                        <Item/>
                        <Item/>
                    </div>
                </div>
            </div>
        )
    }
});

var Item = React.createClass(
{
    render: function()
    {
        return (
            <div className="item"></div>
        )
    }
});

$(document).ready(function()
{
    var root = $(this).find("#game").get(0);
    React.render(<PointAndClickGame/>, root);
});