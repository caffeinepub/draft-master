import Map "mo:core/Map";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Random "mo:core/Random";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import InviteLinksModule "invite-links/invite-links-module";

actor {
  // Initialize authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Initialize invite links state
  let inviteState = InviteLinksModule.initState();

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Shared draft data type with ownership
  type DraftData = {
    owner : Principal;
    content : Text;
    comments : [Text];
  };

  let drafts = Map.empty<Text, DraftData>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Generate share link (unguessable token)
  // No authentication required - guests can create share links for offline-first behavior
  public shared ({ caller }) func generateShareLink(draftId : Text) : async Text {
    let blob = await Random.blob();
    let token = InviteLinksModule.generateUUID(blob);
    drafts.add(token, { 
      owner = caller;
      content = draftId; 
      comments = [] 
    });
    token;
  };

  // Revoke share link - only owner or admin can revoke
  public shared ({ caller }) func revokeShareLink(token : Text) : async () {
    switch (drafts.get(token)) {
      case (null) { Runtime.trap("Share link does not exist") };
      case (?draft) {
        // Check if caller is the owner or an admin
        if (caller != draft.owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the owner or admin can revoke this share link");
        };
        drafts.remove(token);
      };
    };
  };

  // Get draft by share link - anyone with the token can view (including guests)
  public query ({ caller }) func getDraftByShareLink(token : Text) : async ?DraftData {
    drafts.get(token);
  };

  // Add comment to draft via share link - anyone with the token can comment (including guests)
  public shared ({ caller }) func addComment(token : Text, comment : Text) : async () {
    switch (drafts.get(token)) {
      case (null) { Runtime.trap("Share link does not exist") };
      case (?draft) {
        let updatedDraft = {
          owner = draft.owner;
          content = draft.content;
          comments = draft.comments.concat([comment]);
        };
        drafts.add(token, updatedDraft);
      };
    };
  };

  // Native invite link and RSVP functionality
  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  // RSVP submission - no authentication required (guests can RSVP)
  public shared func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };
}
