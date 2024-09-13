import { RoleType } from "@/core/domain/entities/Role";
import { User } from "@/core/domain/entities/User";
import { RoleModel, UserModel } from "@/models/user-role-schema";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event;
  let updating:boolean = false;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_KEY!);


    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log({ paymentIntentSucceeded })
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
        // const lineItems = session.line_items?.data;
        // console.log({ lineItems })
        // let productID
        // if (!lineItems) { console.warn("No line_items.data") } else {
        //   lineItems.forEach(item => {
        //     console.log('Product ID:', item.price?.product);
        //     console.log('Price:', item.price?.unit_amount! / 100); // Los precios se proporcionan en centavos
        //     console.log('Quantity:', item.quantity);
        //     if (item.price?.product) {
        //       productID = item.price?.product!
        //     }
        //   });
        // }
        // const product = await stripe.products.retrieve(productID!);
        // console.log({product})
        // console.log('Product Name:', product.name);
        // console.log('Product Description:', product.description);

        console.log("session", { session })
        console.log("client reference:", session.client_reference_id)
        const user: User | null = await UserModel.findById(session.client_reference_id);
        console.log("user: ", user)
        if (!user) throw new Error("Error with client_reference_id")
        if (!session.metadata || !session.metadata.role) throw new Error("Error at set metadata role")
        const role = await RoleModel.findById(user.roleId)

        if (user.role === RoleType.STUDENT || user.role === RoleType.STUDENT_PRO) {
          const stripeCustomerId = role.stripeCustomerId
          const subscriptionId = role.subscriptionId

          console.log("Cancelling previous subscription...");

          try {
            // Cancel the previous subscription
            await stripe.customers.del(stripeCustomerId)
            
            console.log("Previous user deleted successfully");
            // Proceed to update the user's role or assign the new role
            // Add the logic for assigning the new role here based on the new subscription
            // await stripe.customers.
            // if(stripeCustomerId === session.customer){
            // role.subscriptionId = session.id
            // role.subscriptionStatus = session.status
            // role.permissions = session.metadata.role
            // const savedRole = await role.save()
            // console.log("savedRole: ", {savedRole})
            // }else{
            //   // ⚠️ Entra aqui, solucionar luego
            //   console.log("ERRORCASE: 'new stripe user created', stripeCustomerId !== session.customer")
            // }


          } catch (error) {
            console.error("Error cancelling previous subscription:", error);
            throw error;
          }
        }
        if (!user.roleId) {
          const role = new RoleModel({
            address: user.address,
            permissions: session.metadata.role,
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
            subscriptionStatus: session.status
          })
          console.log("Role created: ", role)
          try {
            await role.save()
            console.log("role saved")

            await UserModel.findByIdAndUpdate(user.id, { roleId: role.id, role: session.metadata.role });
            console.log("user and role saved")
          } catch (saveError) {
            console.error("Error saving role or updating user:", saveError)
            throw saveError
          }

        } 
        else {
          //Update: Primero entra aqui
          role.stripeCustomerId = session.customer
          role.subscriptionId = session.subscription
          role.subscriptionStatus = session.status
          updating = true
          role.permissions = session.metadata.role
          const savedRole = await role.save()
          await UserModel.findByIdAndUpdate(user.id, {role: session.metadata.role})
          console.log("saved role: ", {savedRole})
          
        }
        break;
      case "customer.subscription.deleted":
        //Update: Luego aqui
        const subscriptionId = event.data.object.id;
        try {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          // console.log("subscription: ", { subscription })
          
       
            const role = await RoleModel.findOneAndDelete({ stripeCustomerId: subscription.customer })
            if(!role) break;
          const user = await UserModel.findOneAndUpdate({ address: role.address }, { role: null, roleId: null })
          console.log("updated user: ", { user })
          console.log("deleted role: ", { role })
          
        } catch (error) {
          console.error("Error at handle delete subscription: " , error)
        }
        console.log("Customer deleted with id: ",)
        break;

      case "customer.subscription.updated":
        console.log("is updating info")
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);

    }
    return NextResponse.json({
      status: "success",
    });
  } catch (err) {
    return NextResponse.json({ status: "Failed", err });
  }

}