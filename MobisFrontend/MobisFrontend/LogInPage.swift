//
//  LogInPage.swift
//  MobisFrontend
//
//  Created by Zora Luo on 5/25/24.
//

import SwiftUI

struct LogInPage: View {
    @State private var username = ""
    @State private var password = ""
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Email/Username")) {
                    TextField("Username", text: $username)
                }
                .padding(.bottom, 0)
                
                Section(header: Text("Password")){
                    SecureField("Password", text: $password)
                        .padding(.bottom, 0)
                }
                .padding(.bottom, 0)
                
                Section {
                    Button("Log In") {
                        // Handle the create account action
                        logIn()
                    }
                }
            }
            .navigationBarTitle("Log In")
        }
    }
        //        VStack {
        //            Section(header: Text("Log In")
        //                .font(.system(size: 35))
        //                .padding(.top, 30))
        //            {
        //                TextField("Username", text: $username)
        //                    .textFieldStyle(RoundedBorderTextFieldStyle())
        //                    .padding(10)
        //
        //                SecureField("Password", text: $password)
        //                    .textFieldStyle(RoundedBorderTextFieldStyle())
        //                    .padding(10)
        //
        //                Button("Log In") {
        //                    logIn()
        //                }
        //                .padding(10)
        //            }
        //            .navigationBarTitle("Create Account")
        //        }

        func logIn() {
            // Implement the account creation logic
            print("Logging in...")
            print("Username: \(username)")
            print("Password: \(password)")
        }
}

#Preview {
    LogInPage()
}
