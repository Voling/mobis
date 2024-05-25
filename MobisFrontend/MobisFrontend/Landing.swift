//
//  Landing.swift
//  MobisFrontend
//
//  Created by Zora Luo on 5/25/24.
//

import SwiftUI

struct Landing: View {
    var body: some View {
        VStack {
            Text("MOBIS")
                .font(Font.system(size: 50))
                .fontWeight(.bold)
                .padding(.top, 30)
            
            Image("square")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 250, height: 250)
                .padding(.top, 10)
                    
            Button(action: {
                        // Action for Create Account button
                    }) {
            Text("Create Account")
                .foregroundColor(.white)
                .padding()
                .frame(width: 300, height: 50)
                .background(Color.blue)
                .cornerRadius(10)
            }
            .padding(.top, 50)
            
            Button(action: {
                // Action for Sign In button
            }) {
                Text("Sign In")
                    .foregroundColor(.blue)
                    .padding()
                    .background(Color.white)
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.blue, lineWidth: 1)
                    .frame(width: 300, height: 50)
                    )
            }
            .padding(.top, 20)
        }
        .padding()
        .background(Color.white)
        .edgesIgnoringSafeArea(.all)
    }
}

#Preview {
    Landing()
}
