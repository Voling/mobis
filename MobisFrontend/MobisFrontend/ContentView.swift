import SwiftUI

struct ContentView: View {
    @State var selectedTab = "Home"
    
    var body: some View {
        TabView(selection: $selectedTab){
            //insert each tab we want in our app
            Landing()
            SignUpPage()
                .tag("Home")
                .tabItem {
                    Image(systemName: "house")
                }
            Leaderboard()
                .tag("Content")
                .tabItem {
                    Image(systemName: "person")
                }
        }
    }
}

#Preview {
    ContentView()
}
