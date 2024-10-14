"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const saltRounds = 10;
const cleanDB = async () => {
    await prisma.invoice.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$executeRaw `ALTER SEQUENCE "Invoice_id_seq" RESTART WITH 1001;`;
    await prisma.$executeRaw `ALTER SEQUENCE "User_id_seq" RESTART WITH 1001;`;
    console.log('DB successfully cleaned!');
};
async function main() {
    await cleanDB();
    const users = [
        {
            name: 'Elizabeth Lopez',
            email: 'Lopez@example.org',
            password: 'Lopez123',
        },
        {
            name: 'Ryan Roberts',
            email: 'Roberts@example.org',
            password: 'Roberts123',
        },
        {
            name: 'Carlos Osborn',
            email: 'Osborn@example.org',
            password: 'Osborn123',
        },
        {
            name: 'David Pope',
            email: 'Pope@example.org',
            password: 'Pope123',
        },
        {
            name: 'Abigail Clark',
            email: 'Clark@example.org',
            password: 'Clark123',
        },
    ];
    const hashedUsers = await Promise.all(users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
    }));
    const createdUsers = await Promise.all(hashedUsers.map((user) => prisma.user.create({ data: user })));
    const invoices = [
        {
            vendor_name: 'Nicholas Simmons',
            amount: 133.33,
            due_date: new Date('2024-12-31'),
            address: '6762 Jennifer Fort Apt. 129',
            city: 'Davisport',
            user_id: createdUsers[0].id,
            paid: false,
            description: 'Psychotherapist',
        },
        {
            vendor_name: 'William Davis',
            amount: 54.85,
            due_date: new Date('2024-12-31'),
            address: '178 Frank Brooks Suite 728',
            city: 'Kimberlyhaven',
            user_id: createdUsers[1].id,
            paid: false,
            description: 'Dealer',
        },
        {
            vendor_name: 'Kenneth Rivera',
            amount: 79.7,
            due_date: new Date('2024-12-31'),
            address: '059 Green Neck',
            city: 'South Ronaldland',
            user_id: createdUsers[2].id,
            paid: false,
            description: 'Dispensing optician',
        },
        {
            vendor_name: 'Michelle Alvarado DDS',
            amount: 95.88,
            due_date: new Date('2024-12-31'),
            address: '178 Mahoney Port Apt. 769',
            city: 'West Tylerborough',
            user_id: createdUsers[3].id,
            paid: false,
            description: 'Teacher, English as a foreign language',
        },
        {
            vendor_name: 'Alison Taylor',
            amount: 94.72,
            due_date: new Date('2024-12-31'),
            address: '677 Jill Glen Apt. 647',
            city: 'Grahamberg',
            user_id: createdUsers[4].id,
            paid: false,
            description: 'Training and development officer',
        },
        {
            vendor_name: 'Hunter Williams',
            amount: 38.62,
            due_date: new Date('2024-12-25'),
            address: '9825 Jennifer Haven Suite 963',
            city: 'Wigginsshire',
            user_id: createdUsers[0].id,
            paid: true,
            description: 'Network engineer',
        },
        {
            vendor_name: 'Steven Williams',
            amount: 43.43,
            due_date: new Date('2024-12-31'),
            address: '48718 Brandon Springs Apt. 043',
            city: 'South Charles',
            user_id: createdUsers[1].id,
            paid: false,
            description: 'Oncologist',
        },
        {
            vendor_name: 'Raymond Rios',
            amount: 26.01,
            due_date: new Date('2024-12-31'),
            address: '170 Pierce Street',
            city: 'Taylorside',
            user_id: createdUsers[2].id,
            paid: false,
            description: 'Scientist, clinical (histocompatibility and immunogenetics)',
        },
        {
            vendor_name: 'Kara Jackson',
            amount: 5.21,
            due_date: new Date('2024-12-31'),
            address: '3361 Smith Spring Apt. 843',
            city: 'Allenfort',
            user_id: createdUsers[3].id,
            paid: false,
            description: 'Orthoptist',
        },
        {
            vendor_name: 'Jennifer Solis',
            amount: 31.89,
            due_date: new Date('2024-12-31'),
            address: '201 Moreno Summit Suite 524',
            city: 'Dawnview',
            user_id: createdUsers[4].id,
            paid: false,
            description: 'Sales executive',
        },
        {
            vendor_name: 'Frederick Coleman',
            amount: 62.92,
            due_date: new Date('2024-12-25'),
            address: '4002 Hanna Turnpike Suite 828',
            city: 'Pinedatown',
            user_id: createdUsers[0].id,
            paid: false,
            description: 'Chiropractor',
        },
        {
            vendor_name: 'Tony Mccarthy',
            amount: 33.65,
            due_date: new Date('2024-12-31'),
            address: '66885 Phillips Springs',
            city: 'Port Aaron',
            user_id: createdUsers[1].id,
            paid: false,
            description: 'Telecommunications researcher',
        },
        {
            vendor_name: 'Kenneth Watson',
            amount: 13.28,
            due_date: new Date('2024-12-31'),
            address: '5957 Young Port Apt. 954',
            city: 'Joeport',
            user_id: createdUsers[2].id,
            paid: false,
            description: 'Scientist, biomedical',
        },
        {
            vendor_name: 'Robert Smith',
            amount: 85.51,
            due_date: new Date('2024-12-30'),
            address: '90623 Anthony Wall',
            city: 'Mitchellport',
            user_id: createdUsers[3].id,
            paid: false,
            description: 'Tour manager',
        },
        {
            vendor_name: 'Eric Jimenez',
            amount: 14.16,
            due_date: new Date('2024-12-31'),
            address: '9637 Mark Alley Apt. 465',
            city: 'Teresahaven',
            user_id: createdUsers[4].id,
            paid: false,
            description: 'Electronics engineer',
        },
        {
            vendor_name: 'Marie Meyers',
            amount: 73.62,
            due_date: new Date('2024-12-31'),
            address: '14420 Stanton Branch',
            city: 'Ibarratown',
            user_id: createdUsers[0].id,
            paid: true,
            description: 'Clinical molecular geneticist',
        },
        {
            vendor_name: 'Dylan Allen',
            amount: 57.63,
            due_date: new Date('2024-12-31'),
            address: '006 John Tunnel',
            city: 'Elijahchester',
            user_id: createdUsers[1].id,
            paid: false,
            description: 'Secondary school teacher',
        },
        {
            vendor_name: 'Michael Rodriguez',
            amount: 59.61,
            due_date: new Date('2024-12-30'),
            address: '38272 Davila Spring',
            city: 'Port Andrewbury',
            user_id: createdUsers[2].id,
            paid: false,
            description: 'Community arts worker',
        },
        {
            vendor_name: 'Lori Garcia',
            amount: 5.91,
            due_date: new Date('2024-12-31'),
            address: '3945 Wong Street',
            city: 'Davisfurt',
            user_id: createdUsers[3].id,
            paid: false,
            description: 'Chartered legal executive (England and Wales)',
        },
        {
            vendor_name: 'Kelli Keller',
            amount: 33.1,
            due_date: new Date('2024-12-31'),
            address: '2553 Cindy Plain',
            city: 'South Raymond',
            user_id: createdUsers[4].id,
            paid: false,
            description: 'Equality and diversity officer',
        },
        {
            vendor_name: 'Amanda Stephenson',
            amount: 33.51,
            due_date: new Date('2024-12-31'),
            address: '191 Joy Port',
            city: 'Mendezbury',
            user_id: createdUsers[0].id,
            paid: false,
            description: 'Research scientist (maths)',
        },
        {
            vendor_name: 'Joseph Parrish',
            amount: 40.68,
            due_date: new Date('2024-12-31'),
            address: '432 Latoya Fall Apt. 013',
            city: 'West Paulchester',
            user_id: createdUsers[1].id,
            paid: false,
            description: 'Paramedic',
        },
        {
            vendor_name: 'Wyatt Bautista',
            amount: 28.47,
            due_date: new Date('2024-12-31'),
            address: '541 Jorge View',
            city: 'Lake Jonathanbury',
            user_id: createdUsers[2].id,
            paid: true,
            description: 'Merchandiser, retail',
        },
        {
            vendor_name: 'Michelle Simpson',
            amount: 17.01,
            due_date: new Date('2024-12-31'),
            address: '8164 Cervantes Falls',
            city: 'Lake Andreaside',
            user_id: createdUsers[3].id,
            paid: false,
            description: 'Illustrator',
        },
        {
            vendor_name: 'Joshua Peterson',
            amount: 89.75,
            due_date: new Date('2024-12-31'),
            address: '8165 Hector Alley Apt. 448',
            city: 'Justintown',
            user_id: createdUsers[4].id,
            paid: false,
            description: 'Scientist, research (medical)',
        },
        {
            vendor_name: 'Joshua Peterson',
            amount: 189.75,
            due_date: new Date('2024-12-30'),
            address: '8165 Hector Alley Apt. 448',
            city: 'Justintown',
            user_id: createdUsers[0].id,
            paid: true,
            description: 'Scientist, research (medical)',
        },
        ...Array.from({ length: 75 }, (_, index) => generateRandomInvoice(index % createdUsers.length, createdUsers)),
    ];
    for (const invoice of invoices) {
        await prisma.invoice.create({ data: invoice });
    }
    console.log(`DB successfully seeded! ${users.length} users and ${invoices.length} invoices in DB!`);
}
const randomVendors = [
    'John Doe',
    'Jane Smith',
    'Emily Johnson',
    'Michael Brown',
    'Laura White',
    'James Black',
    'Jessica Green',
    'Mason Giron',
    'Armani Elkins',
    'Kendall Newton',
    'Darrien Koehler',
    'Kalob Spring',
    'Jodi Berger',
    'Mira Mcafee',
    'Dulce Lim',
    'Julie Guevara',
    'Audrey Kendrick',
    'Tracy Holder',
    'Nathaniel Easley',
    'Kelly Drury',
    'Gene Shore',
    'Damien Law',
    'Blayne Law',
    'Natalia Franz',
    'Precious Warner',
    'Emiliano Garay',
    'Eileen ',
    'Nikhil Lawler',
    'Cristopher Gaytan',
    'Tamara Guerrero',
    'Killian Mundy',
    'Amos Hightower',
    'Trevion Vu',
    'Lanie Buck',
    'Katrina Mallory',
    'Syed Earl',
    'Kaden Santoro',
];
const randomCities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
];
const randomDescriptions = [
    'Software Engineer',
    'Doctor',
    'Lawyer',
    'Artist',
    'Data Scientist',
    'Designer',
    'Financial Analyst',
];
const generateRandomInvoice = (index, createdUsers) => {
    const randomVendor = randomVendors[Math.floor(Math.random() * randomVendors.length)];
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    const randomDescription = randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];
    const randomAmount = (Math.random() * 200).toFixed(2);
    const randomDay = Math.floor(Math.random() * 31) + 1;
    const randomDate = new Date(`2024-12-${randomDay}`);
    const randomSt = () => {
        const lastDigits = [4, 5, 6, 7, 8, 9, 0];
        const randomLastDigit = lastDigits[Math.floor(Math.random() * lastDigits.length)];
        const randomNumber = Math.floor(Math.random() * 10) * 10 + randomLastDigit;
        return randomNumber;
    };
    const randomStreetOrBoulevard = () => {
        const abbreviations = ['St.', 'Blvd.', 'Ave.', 'Cir.', 'Pl.', 'Rd.'];
        const randomAbbreviation = abbreviations[Math.floor(Math.random() * abbreviations.length)];
        return randomAbbreviation;
    };
    return {
        vendor_name: randomVendor,
        amount: parseFloat(randomAmount),
        due_date: randomDate,
        address: `${Math.floor(Math.random() * 9999)} ${randomSt()}th ${randomStreetOrBoulevard()} Apt ${Math.floor(Math.random() * 999)}`,
        city: randomCity,
        user_id: createdUsers[index].id,
        paid: Math.random() > 0.5,
        description: randomDescription,
    };
};
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map