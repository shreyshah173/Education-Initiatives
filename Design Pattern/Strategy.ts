// Payment Strategy Interface
interface PaymentStrategy {
    pay(amount: number): void;
}

// Concrete Strategy - CreditCardPayment
class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
    }

    public pay(amount: number): void {
        console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
    }
}

// Concrete Strategy - PayPalPayment
class PayPalPayment implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    public pay(amount: number): void {
        console.log(`Paid $${amount} using PayPal with email ${this.email}`);
    }
}

// Concrete Strategy - CryptoPayment
class CryptoPayment implements PaymentStrategy {
    private walletAddress: string;

    constructor(walletAddress: string) {
        this.walletAddress = walletAddress;
    }

    public pay(amount: number): void {
        console.log(`Paid $${amount} using Crypto wallet ${this.walletAddress}`);
    }
}

// Context - PaymentProcessor
class PaymentProcessor {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    public checkout(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}

// Client code to demonstrate the Strategy Pattern
class ECommerceApp {
    public run(): void {
        const processor = new PaymentProcessor(new CreditCardPayment("1234-5678-9876-5432"));

        console.log("Starting checkout...");

        // Process payment using credit card
        processor.checkout(100);

        // Switch to PayPal
        processor.setPaymentStrategy(new PayPalPayment("user@example.com"));
        processor.checkout(200);

        // Switch to Crypto
        processor.setPaymentStrategy(new CryptoPayment("0xABC1234DEF56789"));
        processor.checkout(300);
    }
}

// Start the e-commerce app
const app = new ECommerceApp();
app.run();
