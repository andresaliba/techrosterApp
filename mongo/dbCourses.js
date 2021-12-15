// drop collection if already exists
db.courses.drop();
// insert new documents into collection
db.courses.insert([
    {
        "code": "APPD1001",
        "name": "User Interface Design and Development",
    },
    {
        "code": "INET2005",
        "name": "Web Application Programming I",
    },
    {
        "code": "PROG1400",
        "name": "Intro to Object Oriented Programming",
    },
    {
        "code": "PROG1700",
        "name": "Logic and Programming",
    },
    {
        "code": "PROG2700",
        "name": "Client Side Programming",
    },
    {
        "code": "PROG3017",
        "name": "Full Stack Programming",
    },
    {
        "code": "WEBD1000",
        "name": "Website Development",
    },
    {
        "code": "WEBD3000",
        "name": "Web Application Programming II",
    },
    {
        "code": "WEBD3027",
        "name": "Developing for Content Management Systems",
    }
]);

