import SwiftUI
import UIKit

struct BlockComponentWrapper: UIViewRepresentable {
    // Optionally add properties if you need to configure the BlockComponent
    var userName: String?
    var losses: Int
    var stepsOwed: Double
    
    func makeUIView(context: Context) -> BlockComponent {
        let blockComponent = BlockComponent()
        blockComponent.userName = userName
        blockComponent.losses = losses
        blockComponent.stepsOwed = stepsOwed
        return blockComponent
    }
    
    func updateUIView(_ uiView: BlockComponent, context: Context) {
        // Update the view with new data
        uiView.userName = userName
        uiView.losses = losses
        uiView.stepsOwed = stepsOwed
    }
}