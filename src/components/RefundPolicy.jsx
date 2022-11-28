const RefundPolicy = () =>{
    return(
        <div className = "px-4 py-12" >
            <h2 className = "mb-6" ><strong>RETURN AND REFUND POLICY</strong></h2>
            <p className = "font-normal mb-4">Our Policy for the return and refund shall be as follows:</p>
            <ol className = "font-normal" style={{listStyleType: "number"}}>
                <li className = "mb-4">We strive to deliver correct medicines/items in the right/undamaged condition every time the customer places an order. We strongly recommend that you check the condition of the delivered products at the time of delivery and get back to us if there are any discrepancy.</li>
                <li  className = "mb-4">If your order is eligible for a return, you can raise a return request within 48 hours from the time of delivery subject to review and verification by CureBay team. No return of damaged products is possible once part or whole of the product has been used.</li>
                <li  className = "mb-4">To raise the return request and return an item, you can call our help desk at customer support numbers and email ids mentioned in the website.</li>
                <li  className = "mb-2">Items are eligible for a return exclusively under the following circumstances:
                    <ul style={{listStyleType: "disc"}}>
                        <li>Products are delayed beyond 48 hours of the estimated date of delivery communicated to the customer at the time of placement of the order.</li>
                        <li>Product(s) delivered do not match the order: This would include items that are different from what the customer ordered.</li>
                        <li>Product(s) were delivered in damaged/non-working condition.</li>
                        <li>Product(s) have missing parts or accessories or different from their description on the product page.</li>
                        <li>Product(s) are returned in original packaging i.e. with labels, barcode, price tags, original serial no. etc.</li>
                        <li>Batch number of the product(s) being returned matches with the one(s) mentioned in the invoice.</li>
                        <li>Product(s)/medicines(s)/bottle(s) are unused. Opened medicine strip(s)/bottle(s) are not eligible for returns.
</li>
                    </ul>
                </li>
                <li  className = "mt-4 mb-2">Refunds and timelines:
                    <ul style={{listStyleType: "disc"}}>
                        <li>Refunds for all eligible returns or cancellations are issued through the payment method used at the time of purchase, except for cash payments made under the Pay on Delivery mode of payment.</li>
                        <li>Refunds may be processed within 15 working days from the receipt of a request from you.</li>
                        <li>The time frame for different payment modes is typically 5-7 business days post the return has been received and verified by CureBay</li>
                        <li>Refund timelines depend on bank turnaround times and RBI guidelines. This may change from time to time. Business days shall mean the working days on which CureBay corporate office operates.</li>
                        <li>For orders placed using Pay on Delivery as the payment method, refunds can be processed to your bank account via National Electronic Funds Transfer (NEFT). There will be no cash refund.</li>
                        <li>To receive refunds in NEFT form, you will need to update the following information to enable us to process a refund to your account:</li>
                        <li>The Bank Account Number</li>
                        <li>IFSC Code</li>
                        <li>Account Holder's Name</li>
                    </ul>
                </li>
            </ol>
            <p className = "mt-4 mb-2 font-medium">Cancellation and Refund Policy</p>
            <p className = "mt-4 mb-2">Our Policy for the cancellation and refund shall be as follows:

</p>
<ol style={{listStyleType: "number"}} className = "font-normal">
    <li>Patients can cancel sevices already booked and paid prior to 48 hours of the expected delviery of goods of services. In such a case the customer can get full refund unless cancellation charges are deducted by the Healthcare Provider.</li>
    <li>In case where the User, does not show up for the appointment booked with a Healthcare Provider, without cancelling the appointment beforehand, there will not be any refunds.</li>
    <li>If you have any questions about our Cancellation and Refund Policy or your expected refunds, please contact us at our customer support numbers mentioned in the website.
</li>
</ol>
<p className = "mt-4 mb-2 font-medium">
Shipping Policy
</p>
<ul style={{listStyleType: "disc"}} className = "font-normal">
    <li>The shipping of goods will be limited to Pharmacy products. The timelines of the shipping will be as per timelines mentioned during time of placing the order. The expected timelines will be 4 hours to 96 hours depending on the location of delivery.</li>
</ul>
<p className = "mt-4 mb-2 font-medium">
Pricing Notes
</p>
<ul style={{listStyleType: "disc"}} className = "font-normal">
    <li>The Pricing for every individual service will be available in the ecommerce portal. The prices will vary for service to service and transaction to transaction.</li>
</ul>
        </div>
    )
}

export default RefundPolicy