module.exports = {
    offices:[
        {
            id:0,
            researcher:"_Home"
        },
        {
            id:1,
            researcher:"Buche"
        },
        {
            id:2,
            researcher:"Gaubert"
        },
        {
            id:3,
            researcher:"Kubicki"
        },
        {
            id:4,
            researcher:"Maisel"
        },
        {
            id:5,
            researcher:"Nedelec"
        },
        {
            id:6,
            researcher:"Parenthoen"
        },
        {
            id:7,
            researcher:"Querrec"
        },
        {
            id:8,
            researcher:"Redou"
        }
    ],

    arks:[
        {
            researcher1:"_Home",
            researcher2:"Buche",
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
            researcher1:"_Home",
            researcher2:"Gaubert",
			direction1:0,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:400,
					speed:50
				}
			]
        },
		{
            researcher1:"Buche",
            researcher2:"Parenthoen",
			direction1:0,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:850,
					speed:50
				}
			]
        },
		{
            researcher1:"Buche",
            researcher2:"Kubicki",
			direction1:3,
			direction2:1,
			moves:[
				{
					move:"forward",
					duration:300,
					speed:50
				}
			]
        },
		{
            researcher1:"Kubicki",
            researcher2:"Maisel",
			direction1:0,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:1600,
					speed:50
				}
			]
        },
		{
            researcher1:"Gaubert",
            researcher2:"Parenthoen",
			direction1:0,
			direction2:1,
			moves:[
				{
					move:"forward",
					duration:450,
					speed:50
				},
				{	move:"right",
					duration:620,
					speed:20
				},
				{
					move:"forward",
					duration:450,
					speed:50
				}
			]
        },
		{
            researcher1:"Maisel",
            researcher2:"Nedelec",
			direction1:3,
			direction2:1,
			moves:[
				{
					move:"forward",
					duration:250,
					speed:50
				}
			]
        },
		{
            researcher1:"Parenthoen",
            researcher2:"Querrec",
			direction1:3,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:100,
					speed:50
				},
				{
					move:"left",
					duration:620,
					speed:20
				},
				{
					move:"forward",
					duration:200,
					speed:50
				}
			]
        },
		{	researcher1:"Querrec",
			researcher2:"Redou",
			direction1:0,
			direction2:2,
			moves:[
				{
					move:"forward",
					duration:350,
					speed:50
				},
				{
					move:"left",
					duration:620,
					speed:20
				},
				{
					move:"forward",
					duration:200,
					speed:50
				},
				{
					move:"right",
					duration:620,
					speed:20
				},
				{
					move:"forward",
					duration:200,
					speed:50
				}
			]
		},
		{	researcher1:"Maisel",
			researcher2:"Redou",
			direction1:1,
			direction2:3,
			moves:[
				{
					move:"forward",
					duration:400,
					speed:50
				}
			]
		}
    ]
};
