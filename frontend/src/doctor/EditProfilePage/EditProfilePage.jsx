import { UserProfile } from "@clerk/clerk-react";

export default function EditProfilePage() {
    return (
        <div className="edit-profile-page">
            <UserProfile routing="hash" />
        </div>
    );
}
