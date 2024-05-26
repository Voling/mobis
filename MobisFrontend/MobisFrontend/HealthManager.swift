import Foundation
import HealthKit

class HealthManager: ObservableObject {
    var healthStore: HKHealthStore?

    init() {
        if HKHealthStore.isHealthDataAvailable() {
            healthStore = HKHealthStore()
            requestHealthKitAuthorization()
        }
    }
    
    func requestHealthKitAuthorization() {
        let stepType = HKQuantityType.quantityType(forIdentifier: HKQuantityTypeIdentifier.stepCount)!
        let typesToRead: Set<HKObjectType> = [stepType]
        
        healthStore?.requestAuthorization(toShare: nil, read: typesToRead) { success, error in
            if !success {
                // Handle the error here.
                print("Authorization failed")
            }
        }
    }
    
    func getTodaysSteps(completion: @escaping (Double) -> Void) {
        guard let stepsQuantityType = HKQuantityType.quantityType(forIdentifier: .stepCount) else {
            completion(0.0)
            return
        }
        
        let now = Date()
        let startOfDay = Calendar.current.startOfDay(for: now)
        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: now, options: .strictStartDate)

        let query = HKStatisticsQuery(quantityType: stepsQuantityType, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, result, error in
            guard let result = result, error == nil else {
                print("Failed to fetch steps: \(String(describing: error?.localizedDescription))")
                completion(0.0)
                return
            }
            
            let totalSteps = result.sumQuantity()?.doubleValue(for: HKUnit.count()) ?? 0.0
            completion(totalSteps)
        }
        
        healthStore?.execute(query)
    }
}