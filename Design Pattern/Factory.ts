import readline from 'readline';

// Vehicle Interface (Product)
interface Vehicle {
    rent(): void;
}

// Concrete Product - Car
class Car implements Vehicle {
    rent(): void {
        console.log("Car has been rented.");
    }
}

// Concrete Product - Bike
class Bike implements Vehicle {
    rent(): void {
        console.log("Bike has been rented.");
    }
}

// Abstract Creator (Vehicle Rental)
abstract class VehicleRental {
    public abstract createVehicle(): Vehicle;

    public rentVehicle(): void {
        const vehicle = this.createVehicle();
        vehicle.rent();
    }
}

// Concrete Creator - CarRental
class CarRental extends VehicleRental {
    public createVehicle(): Vehicle {
        return new Car();
    }
}

// Concrete Creator - BikeRental
class BikeRental extends VehicleRental {
    public createVehicle(): Vehicle {
        return new Bike();
    }
}

// Client code
class RentalService {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    public run(): void {
        this.displayMenu();
    }

    private displayMenu(): void {
        console.log("\nVehicle Rental Menu:");
        console.log("1. Rent a Car");
        console.log("2. Rent a Bike");
        console.log("3. Exit");
        this.rl.question("Select an option (1-3): ", (input) => {
            this.handleMenuSelection(input);
        });
    }

    private handleMenuSelection(input: string): void {
        switch (input) {
            case '1':
                this.rentCar();
                break;
            case '2':
                this.rentBike();
                break;
            case '3':
                this.exit();
                break;
            default:
                console.log("Invalid input, please try again.");
                this.displayMenu();
                break;
        }
    }

    private rentCar(): void {
        let vehicleRental: VehicleRental = new CarRental();
        vehicleRental.rentVehicle();
        this.displayMenu();
    }

    private rentBike(): void {
        let vehicleRental: VehicleRental = new BikeRental();
        vehicleRental.rentVehicle();
        this.displayMenu();
    }

    private exit(): void {
        console.log("Exiting Vehicle Rental Service...");
        this.rl.close();
    }
}

// Start the rental service
const rentalService = new RentalService();
rentalService.run();
