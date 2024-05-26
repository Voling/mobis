import UIKit
import HealthKit

class BlockComponent: UIView {
    
    // MARK: - Properties
    let healthKitStore = HKHealthStore()
    var userName: String?
    var losses: Int = 5 // Hardcoded for now
    var stepsOwed: Double = 5000.0
    var stepsToday: Double = 0.0
    
    // MARK: - UI Elements
    private let userNameLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.boldSystemFont(ofSize: 16)
        label.textAlignment = .center
        return label
    }()
    
    private let lossesLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 14)
        label.textAlignment = .center
        return label
    }()
    
    private let stepsOwedLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 14)
        label.textAlignment = .center
        return label
    }()
    
    private let stepsTodayLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 14)
        label.textAlignment = .center
        return label
    }()
    
    private let likeButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Like", for: .normal)
        button.setTitleColor(.blue, for: .normal)
        return button
    }()
    
    private let dislikeButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Dislike", for: .normal)
        button.setTitleColor(.red, for: .normal)
        return button
    }()
    
    private let shareButton: UIButton = {
        let button = UIButton(type: .system)
        button.setImage(UIImage(systemName: "square.and.arrow.up"), for: .normal)
        button.tintColor = .gray
        return button
    }()
    
    // MARK: - Initialization
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
        fetchStepsToday()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupViews()
        fetchStepsToday()
    }
    
    // MARK: - View Setup
    private func setupViews() {
        addSubview(userNameLabel)
        addSubview(lossesLabel)
        addSubview(stepsOwedLabel)
        addSubview(stepsTodayLabel)
        addSubview(likeButton)
        addSubview(dislikeButton)
        addSubview(shareButton)
        
        userNameLabel.text = userName
        lossesLabel.text = "Losses: \(losses)"
        stepsOwedLabel.text = "Steps Owed: \(stepsOwed)"
        
        // Add constraints and layout views
        // ...
        
        // Add target actions for buttons
        likeButton.addTarget(self, action: #selector(likeButtonTapped), for: .touchUpInside)
        dislikeButton.addTarget(self, action: #selector(dislikeButtonTapped), for: .touchUpInside)
        shareButton.addTarget(self, action: #selector(shareButtonTapped), for: .touchUpInside)
    }
    
    // MARK: - HealthKit
    private func fetchStepsToday() {
        let todayDate = Date()
        let calendar = Calendar.current
        var anchorComponents = calendar.dateComponents([.year, .month, .day], from: todayDate)
        anchorComponents.hour = 0
        anchorComponents.minute = 0
        anchorComponents.second = 0
        
        let anchorDate = calendar.date(from: anchorComponents)!
        
        guard let stepCountType = HKQuantityType.quantityType(forIdentifier: .stepCount) else {
            print("Step count type is no longer available in HealthKit")
            return
        }
        
        let stepsQuery = HKStatisticsCollectionQuery(quantityType: stepCountType,
                                                     quantitySamplePredicate: nil,
                                                     options: .cumulativeSum,
                                                     anchorDate: anchorDate,
                                                     intervalComponents: DateComponents(day: 1))
        
        stepsQuery.initialResultsHandler = { query, results, error in
            if let error = error {
                print("Error fetching steps: \(error.localizedDescription)")
                return
            }
            
            guard let statsCollection = results else {
                return
            }
            
            statsCollection.enumerateStatistics(from: anchorDate, to: todayDate) { statistics, stop in
                if let sum = statistics.sumQuantity() {
                    let stepCount = sum.doubleValue(for: HKUnit.count())
                    DispatchQueue.main.async {
                        self.stepsTodayLabel.text = "Steps Today: \(Int(stepCount))"
                    }
                }
            }
        }
        
        healthKitStore.execute(stepsQuery)
    }
    
    // MARK: - Button Actions
    @objc private func likeButtonTapped() {
        // Handle like button tap
        print("Like button tapped")
    }
    
    @objc private func dislikeButtonTapped() {
        // Handle dislike button tap
        print("Dislike button tapped")
    }
    
    @objc private func shareButtonTapped() {
        // Handle share button tap
        print("Share button tapped")
    }
}
