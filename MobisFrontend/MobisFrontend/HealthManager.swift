
// HealthManager.swift
// MobisFrontend

import SwiftUI
import HealthKit

class HealthManager: ObservableObject {
    @StateObject var manager = HealthManager()
    let healthStore = HKHealthStore()

    init() {
        let steps = HKQuantityType(.stepCount)

        let healthTypes: Set = [steps]

        Task {
            do {
                try await healthStore.requestAuthorization(toShare: [], read: healthTypes)
            } catch {
                print("Error fetching health data")
            }
        }
    }
}
