var PointAndClickGame = React.createClass(
{
    render: function()
    {
        return (
            <div id="game">
                <div id="content">
                    Hello World!
                </div>
                <div id="menu">
                    <div className="item"></div>
                    <div className="item"></div>
                </div>
            </div>
        )
    }
});

$(document).ready(function()
{
    var root = $(this).find("#game").get(0);
    React.render(<PointAndClickGame/>, root);
});