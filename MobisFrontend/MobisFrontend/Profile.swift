//
//  Profile.swift
//  MobisFrontend
//
//  Created by Zora Luo on 5/25/24.
//

import SwiftUI

struct Profile: View {
    @EnvironmentObject var manager: HealthManager
    var body: some View {
        VStack(){
            Image("circle")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 120, height:120)
                .padding(.top, 10)
            Text("Player's User")
                .foregroundColor(.black)
                .padding(.top, 10)
            Text("Valorant, League of Legends")
                .foregroundColor(.black)
                .padding(.top, 5)

            ZStack {
                Rectangle()
                    .fill(Color.yellow)
                    .frame(height: 30)
                    .cornerRadius(10)
                    .padding(.horizontal, 20)
                
                Text("Rank")
                    .foregroundColor(.white)
                    .font(.headline)
            }

            Image("rectangle")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 350)
                .padding(.top, 10)
                .padding(.horizontal, 10)
            
            ZStack {
                Rectangle()
                    .fill(Color.gray)
                    .frame(height: 80)
                    .cornerRadius(10)
                    .padding(.top, 10)
                    .padding(.horizontal, 20)
                
                HStack(spacing: 40) {
                    Text("Mobis\nStreak")
                        .foregroundColor(.white)
                    Text("Avg Steps\nper Day")
                        .foregroundColor(.white)
                    Text("Steps\nthis Week")
                        .foregroundColor(.white)
                }
                .padding(.leading, 5)
            }

            ZStack {
                Rectangle()
                    .fill(Color.gray)
                    .frame(height: 80)
                    .cornerRadius(10)
                    .padding(.top, 10)
                    .padding(.horizontal, 20)
                
                HStack(spacing: 20) {
                    Text("Longest\nLoss Streak")
                        .foregroundColor(.white)
                    Text("Avg Losses\nper Day")
                        .foregroundColor(.white)
                    Text("Losses\nthis Week")
                        .foregroundColor(.white)
                }
                .padding(.leading, 15)
            }
        }
    }
}

#Preview {
    Profile()
                      
            
            
}
