import CatalogLayout from "./CatalogLayout";



export default function Checkout({ status, paymentUrl, orderId }) {

    return (
        <CatalogLayout>
            <div className="">
                <p>Status: {status}</p>
                <p>Payment url: {paymentUrl}</p>
                <p>Order Id: {orderId}</p>
            </div>
        </CatalogLayout>
    )
}