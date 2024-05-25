import SwiftUI

struct ContentView: View {

    @EnvironmentObject var manager: HealthManager
    @State var selectedTab = "Home"
    
    var body: some View {
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
                }
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
