import SwiftUI

struct SignupView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var email = ""
    @State private var phoneNumber = ""

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Sign Up")) {
                    TextField("Username", text: $username)
                    SecureField("Password", text: $password)
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)  // Use the email-address keyboard
                    TextField("Phone Number", text: $phoneNumber)
                        .keyboardType(.phonePad)  // Use the phone pad keyboard
                }
                Section {
                    Button("Create Account") {
                        // Handle the create account action
                        createAccount()
                    }
                }
            }
            .navigationBarTitle("Create Account")
        }
    }

    func createAccount() {
        // Implement the account creation logic
        print("Creating account...")
        print("Username: \(username)")
        print("Password: \(password)")
        print("Email: \(email)")
        print("Phone Number: \(phoneNumber)")
    }
}

struct SignupView_Previews: PreviewProvider {
    static var previews: some View {
        SignUpPage()
    }
}