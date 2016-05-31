module.exports = {
    offices:[
        {
            id:0,
            researcher:"_Home"
        },
        {
            id:1,
            researcher:"Mr Buche"
        },
        {
            id:2,
            researcher:"Mr Gaubert"
        },
        {
            id:3,
            researcher:"Mr Kubicki"
        }
    ],

    arks:[
        {
            researcher1:"_Home",
            researcher2:"Mr Buche",
			direction1:3,
			direction2:1,
			moves:[
				{
					move:"forward",
					duration:500,
					speed:50
				}
			]
        },
        {
            researcher1:"Buche",
            researcher2:"Mr Kubicki",
			direction1:0,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:600,
					speed:50
				}
			]
        },
        {
            researcher1:"_Home",
            researcher2:"Mr Gaubert",
			direction1:0,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:500,
					speed:50
				}
			]
        },
        {
            researcher1:"Mr Gaubert",
            researcher2:"Mr Kubicki",
			direction1:3,
			direction2:1,
			moves:[
				{
					move:"forward",
					duration:500,
					speed:50
				}
			]
        }
    ]
};
