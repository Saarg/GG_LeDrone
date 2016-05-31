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
        },
        {
            id:4,
            researcher:"M Bevacqua"
        },
        {
            id:5,
            researcher:"Mr Nedelec"
        },
        {
            id:6,
            researcher:"Mr Parenthoen"
        },
        {
            id:7,
            researcher:"Mr Querrec"
        },
        {
            id:8,
            researcher:"Mr Redou"
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
            researcher1:"_Home",
            researcher2:"Mr Gaubert",
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
            researcher1:"Mr Buche",
            researcher2:"Mr Parenthoen",
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
            researcher1:"Mr Buche",
            researcher2:"Mr Kubicki",
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
            researcher1:"Mr Kubicki",
            researcher2:"M Bevacqua",
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
            researcher1:"Mr Gaubert",
            researcher2:"Mr Parenthoen",
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
            researcher1:"M Bevacqua",
            researcher2:"Mr Nedelec",
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
            researcher1:"Mr Parenthoen",
            researcher2:"Mr Querrec",
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
		{	researcher1:"Mr Querrec",
			researcher2:"Mr Redou",
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
		{	researcher1:"M Bevacqua",
			researcher2:"Mr Redou",
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
