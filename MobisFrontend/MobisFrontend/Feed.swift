import SwiftUI

struct Feed: View {
    var body: some View {
        ScrollView {
            VStack {
                // Example usage of the BlockComponentWrapper
                BlockComponentWrapper(userName: "John Doe", losses: 5, stepsOwed: 5000)
                // Add other views as needed
            }
        }
    }
}

#Preview {
    Feed()
}
