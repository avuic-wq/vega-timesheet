import { PrismaClient, UserRole } from "@prisma/client";
import { DEFAULT_SALT_ROUNDS } from "@/src/lib/consts";
import { saltAndHashPassword } from "@/src/lib/utils/saltAndHashPassword";

// CHECK: const and utils function from src/lib seems weird or not?
const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting seed...");

	// ==================================================
	// 0. WIPE SOME TABLES
	// ==================================================
	await prisma.timeLog.deleteMany({});
	await prisma.project.deleteMany({});
	await prisma.client.deleteMany({});
	await prisma.user.deleteMany({});

	// ==================================================
	// 1. CREATE USERS
	// ==================================================

	const hashedPassword = await saltAndHashPassword(
		"admin",
		DEFAULT_SALT_ROUNDS,
	);

	const adminUser = await prisma.user.upsert({
		where: { username: "a.vuic" },
		update: {},
		create: {
			username: "a.vuic",
			password: hashedPassword,
			firstName: "Aleksa",
			lastName: "Vuic",
			roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
		},
	});
	console.log("✅ Created admin user:", adminUser.username);

	// Additional employee users
	const employeeUsersData = [
		{ username: "marko.p", firstName: "Marko", lastName: "Petrovic" },
		{ username: "ana.j", firstName: "Ana", lastName: "Jovanovic" },
		{ username: "stefan.n", firstName: "Stefan", lastName: "Nikolic" },
		{ username: "jelena.d", firstName: "Jelena", lastName: "Djordjevic" },
		{ username: "nemanja.m", firstName: "Nemanja", lastName: "Milosevic" },
		{ username: "milica.s", firstName: "Milica", lastName: "Stojanovic" },
		{ username: "dusan.p", firstName: "Dusan", lastName: "Popovic" },
		{ username: "jovana.i", firstName: "Jovana", lastName: "Ilic" },
		{ username: "nikola.m", firstName: "Nikola", lastName: "Markovic" },
	];

	const users = [adminUser];
	const defaultPassword = await saltAndHashPassword(
		"password123",
		DEFAULT_SALT_ROUNDS,
	);

	for (const emp of employeeUsersData) {
		const user = await prisma.user.upsert({
			where: { username: emp.username },
			update: {},
			create: {
				username: emp.username,
				password: defaultPassword,
				firstName: emp.firstName,
				lastName: emp.lastName,
				roles: [UserRole.EMPLOYEE],
			},
		});
		users.push(user);
	}
	console.log(`✅ Created ${users.length} users`);

	// ==================================================
	// 2. SEED INDUSTRIES
	// ==================================================

	const industryNames = [
		"Housing & Construction",
		"Financial Services",
		"Healthcare",
		"E-commerce",
		"Telecommunications",
		"Manufacturing",
		"Education",
		"Real Estate",
		"Transportation",
		"Media & Entertainment",
	];

	await prisma.industry.createMany({
		data: industryNames.map((name) => ({ name })),
		skipDuplicates: true,
	});

	const industries = await prisma.industry.findMany({
		where: { name: { in: industryNames } },
	});
	console.log(`✅ Seeded ${industries.length} industries`);

	// ==================================================
	// 3. SEED TIME LOG CATEGORIES
	// ==================================================

	const categoryNames = [
		"Business Analysis",
		"Delivery Management",
		"Product Management",
		"Software Development",
		"Scrum Master",
		"DevOps",
		"Testing",
		"Meetings",
		"Project setup & knowledge transfer",
		"Presentation",
	];

	await prisma.timeLogCategory.createMany({
		data: categoryNames.map((name) => ({ name })),
		skipDuplicates: true,
	});

	const categories = await prisma.timeLogCategory.findMany({
		where: { name: { in: categoryNames } },
	});
	console.log(`✅ Seeded ${categories.length} time log categories`);

	// ==================================================
	// 4. SEED CLIENTS (with ISO country codes)
	// ==================================================

	const clientData = [
		{
			name: "TechCorp Solutions",
			address: "123 Silicon Valley Blvd",
			countryCode: "USA",
		},
		{
			name: "Global Finance Ltd",
			address: "45 Canary Wharf",
			countryCode: "GBR",
		},
		{
			name: "HealthCare Plus",
			address: "789 Medical Center Dr",
			countryCode: "USA",
		},
		{
			name: "EuroTech GmbH",
			address: "Berliner Straße 100",
			countryCode: "DEU",
		},
		{
			name: "Retail Innovations",
			address: "321 Commerce Street",
			countryCode: "CAN",
		},
		{
			name: "Digital Marketing Pro",
			address: "Terazije 25",
			countryCode: "SRB",
		},
		{
			name: "CloudSystems AG",
			address: "Zürich Hauptbahnhof 5",
			countryCode: "CHE",
		},
		{
			name: "Mobile Apps Inc",
			address: "Amsterdam Central 42",
			countryCode: "NLD",
		},
		{
			name: "AI Research Lab",
			address: "Stockholm Tech Park 15",
			countryCode: "SWE",
		},
		{
			name: "Startup Accelerator",
			address: "Oslo Innovation Hub 8",
			countryCode: "NOR",
		},
	];

	const expandedClientsData = clientData.flatMap((item) => {
		return [item, item, item, item, item, item, item, item, item, item];
	});

	const clients = await prisma.client.createManyAndReturn({
		data: expandedClientsData,
	});
	console.log(`✅ Seeded ${clients.length} clients`);

	// ==================================================
	// 5. SEED PROJECTS
	// ==================================================

	const projectData = [
		{
			name: "Pinnacle",
			clientId: clients[0].id,
			industryId: industries[3].id,
		},
		{
			name: "Aurora",
			clientId: clients[1].id,
			industryId: industries[1].id,
		},
		{
			name: "Nova Management System",
			clientId: clients[2].id,
			industryId: industries[2].id,
		},
		{
			name: "ERP Zephyr",
			clientId: clients[3].id,
			industryId: industries[0].id,
		},
		{
			name: "IMP Summit",
			clientId: clients[4].id,
			industryId: industries[3].id,
		},
		{
			name: "Orion Automation Tool",
			clientId: clients[5].id,
			industryId: industries[9].id,
		},
		{
			name: "Momentum - Cloud Infrastructure",
			clientId: clients[6].id,
			industryId: industries[0].id,
		},
		{
			name: "Catalyst iOS",
			clientId: clients[7].id,
			industryId: industries[0].id,
		},
		{
			name: "Nebula Pipeline",
			clientId: clients[8].id,
			industryId: industries[0].id,
		},
		{
			name: "Startup Falcon",
			clientId: clients[9].id,
			industryId: industries[0].id,
		},
	];

	const expandedPrjectsData = projectData.flatMap((item) => {
		return [item, item, item, item, item, item, item, item, item, item];
	});

	const projects = await prisma.project.createManyAndReturn({
		data: expandedPrjectsData,
	});
	console.log(`✅ Seeded ${projects.length} projects`);

	// ==================================================
	// 6. SEED TIME LOGS
	// ==================================================

	const timeLogData = [
		{
			date: new Date("2024-11-01"),
			hours: 8.0,
			description: "Implemented user authentication module with JWT tokens",
			userId: users[0].id,
			clientId: clients[0].id,
			projectId: projects[0].id,
			categoryId: categories[0].id,
		},
		{
			date: new Date("2024-11-01"),
			hours: 4.5,
			description: "Code review for payment gateway integration",
			userId: users[1].id,
			clientId: clients[1].id,
			projectId: projects[1].id,
			categoryId: categories[1].id,
		},
		{
			date: new Date("2024-11-02"),
			hours: 6.0,
			description: "Fixed critical bug in patient data export feature",
			userId: users[0].id,
			clientId: clients[2].id,
			projectId: projects[2].id,
			categoryId: categories[3].id,
		},
		{
			date: new Date("2024-11-02"),
			hours: 7.5,
			description: "Database schema optimization and migration planning",
			userId: users[2].id,
			clientId: clients[3].id,
			projectId: projects[3].id,
			categoryId: categories[8].id,
		},
		{
			date: new Date("2024-11-03"),
			hours: 5.0,
			description: "Client meeting to discuss Q4 milestones",
			userId: users[3].id,
			clientId: clients[5].id,
			projectId: projects[5].id,
			categoryId: categories[6].id,
		},
		{
			date: new Date("2024-11-03"),
			hours: 8.5,
			description: "Developed REST API endpoints for inventory management",
			userId: users[4].id,
			clientId: clients[4].id,
			projectId: projects[4].id,
			categoryId: categories[0].id,
		},
		{
			date: new Date("2024-11-04"),
			hours: 6.5,
			description: "UI/UX design for mobile banking dashboard",
			userId: users[5].id,
			clientId: clients[1].id,
			projectId: projects[1].id,
			categoryId: categories[4].id,
		},
		{
			date: new Date("2024-11-04"),
			hours: 4.0,
			description: "Wrote technical documentation for API endpoints",
			userId: users[6].id,
			clientId: clients[6].id,
			projectId: projects[6].id,
			categoryId: categories[7].id,
		},
		{
			date: new Date("2024-11-05"),
			hours: 7.0,
			description: "Configured CI/CD pipeline with GitHub Actions",
			userId: users[7].id,
			clientId: clients[6].id,
			projectId: projects[6].id,
			categoryId: categories[9].id,
		},
		{
			date: new Date("2024-11-05"),
			hours: 5.5,
			description: "Conducted unit testing for authentication module",
			userId: users[8].id,
			clientId: clients[0].id,
			projectId: projects[0].id,
			categoryId: categories[2].id,
		},
	];

	await prisma.timeLog.createMany({
		data: timeLogData,
	});
	console.log(`✅ Seeded ${timeLogData.length} time logs`);

	console.log("🎉 Seed completed successfully!");
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
