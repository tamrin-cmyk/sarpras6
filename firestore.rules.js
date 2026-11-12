rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAdmin() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || isAdmin();
    }

    match /inventory/{itemId} {
      allow read: if true; // Tamu bisa melihat katalog tanpa login
      allow write: if isAdmin();
    }
    
    match /locations/{locId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /transactions/{transId} {
      allow read: if request.auth != null && (request.auth.uid == resource.data.uid_peminjam || isAdmin());
      allow create: if request.auth != null && request.resource.data.uid_peminjam == request.auth.uid;
      allow update, delete: if isAdmin();
    }
  }
}
