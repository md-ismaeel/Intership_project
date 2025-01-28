import CheckOutCartData from "@/app/Components/CheckOutComponent/CheckOutCartData";
import CheckOutForm from "@/app/Components/CheckOutComponent/CheckOutForm";

export default function CheckoutPage() {

    return (
        <section className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center px-5 gap-2 pt-4">
            <CheckOutCartData />
            <CheckOutForm />
        </section>
    );
}
