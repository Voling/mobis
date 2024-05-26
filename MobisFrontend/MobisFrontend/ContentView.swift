import SwiftUI

struct ContentView: View {
    @StateObject var manager = HealthManager()
    @State var selectedTab = "Home"
    @State private var stepsCount = 0
    
    var body: some View {
            Text("Number of steps: \(stepsCount)")
            .onAppear {
                manager.getTodaysSteps {
                    steps in stepsCount = Int(steps)
                }
            }
        TabView(selection: $selectedTab){
            //insert each tab we want in our app
            Leaderboard()
                .tag("Leaderboard")
                .tabItem {
                    Image(systemName: "person")
                }
            Feed()
                .tag("Feed")
                .tabItem {
                    Image(systemName: "house")
                }.environmentObject(manager)
            Profile()
                .tag("Profile")
                .tabItem {
                    Image(systemName: "person.crop.circle")
                }
        }
    }
}

#Preview {
    ContentView()
}
