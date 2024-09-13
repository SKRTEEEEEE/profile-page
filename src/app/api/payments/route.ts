import { User } from "@/core/domain/entities/User";
import { RoleModel, UserModel } from "@/models/user-role-schema";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
  
const stripe = new Stripe(process.env.STRIPE_API_KEY!);
export async function POST(req:NextRequest){
    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_KEY!);
  
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log({paymentIntentSucceeded})
        break;
      // ... handle other event types
      case "checkout.session.completed":
        console.log("checkout session triggered")
        const session = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
              expand: ["line_items"],
            }
          );
          const user: User | null = await UserModel.findById(session.client_reference_id);
          if(!user) throw new Error("Error with client_reference_id")
        if(!session.metadata || !session.metadata.role) throw new Error("Error at set metadata role")
        if(!user.roleId){
          const role = new RoleModel({
            address: user.address,
            permissions: session.metadata.role,
            stripeCustomerId: session.customer,
            subscriptionId: session.id,
            subscriptionStatus: session.status
          })
          console.log("Role created: ", role)
          await role.save()
          console.log("role saved")
          await UserModel.findByIdAndUpdate({id: user.id, update:{roleId: role.id, role: session.metadata.role}})
          console.log("user and role saved")

        }else
        {
          console.log("here goes the update role")
          //Lo que se haga para el updateRole
        }
        break;
      case "customer.subscription.deleted":
      //Do what i said
      console.log("Customer deleted with id: ",)
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }  
    return NextResponse.json({
        status: "success",
      });
} catch (err){
    return NextResponse.json({ status: "Failed", err });
}
  
}