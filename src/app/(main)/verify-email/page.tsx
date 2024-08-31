import { verifyEmail } from "@/actions/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";
import { Suspense } from "react";
type SearchParams = {
    verifyToken?: string;
    id?: string;
  }
  
  type PageProps = {
    searchParams: SearchParams;
  }

async function VerifyEmailContent({ verifyToken, id }: SearchParams) {
    if (!verifyToken || !id) {
      return (
        <Alert variant="destructive" className="mb-5">
          <CircleX color="red" />
          <AlertTitle>Invalid URL</AlertTitle>
          <AlertDescription>
            The verification token or user ID is missing.
          </AlertDescription>
        </Alert>
      );
    }

    const result = await verifyEmail(id, verifyToken);
  
    if (result) {
      return (
        <Alert variant="default" className="mb-5">
          <SquareCheckBig color="green" />
          <AlertTitle>Email Verified!</AlertTitle>
          <AlertDescription>
            Your email has been verified successfully.
          </AlertDescription>
        </Alert>
      );
    } else {
      return (
        <Alert variant="destructive" className="mb-5">
          <CircleX color="red" />
          <AlertTitle>Email Verification Failed!</AlertTitle>
          <AlertDescription>
            Your verification token is invalid or expired.
          </AlertDescription>
        </Alert>
      );
    }
  }
  
  export default function VerifyEmailPage({ searchParams }: PageProps) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <Suspense fallback={<div>Verifying your email address. Please wait...</div>}>
            <VerifyEmailContent {...searchParams} />
          </Suspense>
        </div>
      </div>
    );
  }