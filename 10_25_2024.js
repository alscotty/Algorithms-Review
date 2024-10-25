/*
Type Employee:
{
  start_day: number; // The day the employee started working at the company (in days)
  trained_day?: number; // The day the employee was trained (in days), optional
}

Type Status:
{
  name: string; // one of ["not_required", "pending", "overdue", "completed"]
  days_overdue: number; // 0 if not overdue
}
*/

/**
 * getTrainingStatus is a function that evaluates an employee's training status on a specified check_day.
 * 
 * @param {Employee} employee
 * @param {number} training_window - The number of days an employee has to complete their training after their start day.
 * @param {number} check_day - The day for which we are checking the employee's training status.
 *
 * @returns {Status} - The employee's training status on the check_day.
 */
function getTrainingStatus(employee, training_window, check_day) {
    const { start_day, trained_day } = employee;
    // not required:
    if (check_day < start_day) {
      return {
        name: "not_required",
        days_overdue: 0,
      }
    }
  
    if (!!trained_day && check_day >= trained_day) {
      //completed, don't care about days overdue
      return {
        name: "completed",
        days_overdue: 0,
      };
    } else {
      let lastDayToNotBeLate = start_day + training_window
      // pending if within training window
      if (check_day <= lastDayToNotBeLate) {
        return {
          name: "pending",
          days_overdue: 0,
        }
      } else {
        // over if beyond training window
        // console.log(getTrainingStatus({ start_day: 100, trained_day: 109 }, 5, 106)) 
        return {
          name: "overdue",
          days_overdue: check_day - lastDayToNotBeLate,
        }
  
      }
  
    }
  
  }
  
  /**
  Example 1:
  training_window: 10 days
  employee: {start_day: 100}
  check_day: 104
  result: {name: "pending", days_overdue: 0}
  
               |<-----------------------training window------------------->|
  Time:  |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
  Days: 99    100   101   102   103   104   105   106   107   108   109   110   111
               |                       |
           start_day                check_day
  **/
  // console.log('Expect pending w no overdue days')
  // console.log(getTrainingStatus({ start_day: 100 }, 10, 104))
  /**
  Example 2:
  training_window: 10 days
  employee: {start_day: 100, trained_day: 105}
  check_day: 110
  result:  {name: "completed", days_overdue: 0}
  
               |<-----------------------training window------------------->|
  Time:  |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
  Days: 99    100   101   102   103   104   105   106   107   108   109   110   111
               |                             |                             |
          start_day                     trained_day                    check_day
  **/
  // console.log('Expect completed w no overdue days')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 105 }, 10, 110))
  /**
  Example 3:
  training_window: 5 days
  employee: {start_day: 100, trained_day: 107}
  check_day: 110
  result:  {name: "completed", days_overdue: 0}
  
               |<------training window------>|
  Time:  |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
  Days: 99    100   101   102   103   104   105   106   107   108   109   110   111
               |                                         |                 |
          start_day                                 trained_day         check_day
  **/
  // console.log('Expect completed w no overdue days pt II')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 107 }, 5, 110))
  /** 
  Example 4:
  training_window: 5 days
  employee: {start_day: 100, trained_day: 109}
  check_day: 106
  result: {name: "overdue", days_overdue: 1}
  
               |<------training window------>|
  Time:  |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
  Days: 99    100   101   102   103   104   105   106   107   108   109   110   111
               |                                   |                 |
          start_day                            check_day         trained_day
  
  (employee, training_window, check_day)           -> (status)
  
  {"start_day": 100                    }, 10,  99  -> {"name": "not_required", "days_overdue": 0}
  {"start_day": 100                    }, 10, 104  -> {"name": "pending",      "days_overdue": 0}
  {"start_day": 100, "trained_day": 105}, 10, 110  -> {"name": "completed",    "days_overdue": 0}
  {"start_day": 100, "trained_day": 107},  5, 110  -> {"name": "completed",    "days_overdue": 0}
  {"start_day": 100, "trained_day": 109},  5, 106  -> {"name": "overdue",      "days_overdue": 1}
   */
  // console.log('Expect overdue with 1 day late')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 109 }, 5, 106)) 
  
  // console.log('Expect not required, 0 days overdue')
  // console.log(getTrainingStatus({ start_day: 100 }, 10, 99)) 
  
  // console.log('Expect overdue w 5 overdue days')
  // console.log(getTrainingStatus({ start_day: 100 }, 10, 115))
  
  // console.log('Expect pending w 0 overdue days')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 115 }, 10, 102))
  
  // console.log('Expect pending w 0 overdue days')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 103 }, 10, 102))
  
  // console.log('Expect completed w 0 overdue days')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 103 }, 10, 108))
  
  // console.log('Expect completed w 0 overdue days')
  // console.log(getTrainingStatus({ start_day: 100, trained_day: 103 }, 10, 103))
  
  // console.log('Expect pending w 0 overdue days')
  // console.log(getTrainingStatus({ start_day: 100 }, 10, 110))
  
  
  /*
  Employee:
  {
    ...
    group_id: string, // Indicates the group to which the employee belongs
  }
  
  Group:
  {
    id: string, // Unique identifier for the group
    parent_id: string (optional), // ID of the parent group, if any
    child_ids: Array<string>, // IDs of the child groups
  }
  
  Datapoint:
  {
    group_id: string,
    num_employees: number,
    total_days_overdue: number,
  }
  */
  
  /**
   * This function returns the total days overdue for training completion for each
   * group, considering both direct and indirect (i.e., through sub-groups)
   * employee memberships.
   *
   * @param {Array<Employee>} employees
   * @param {Object<string, Group>} groupsById - A dictionary mapping a group id to the corresponding Group.
   * @param {number} trainingWindow - Duration (number of days) employees have to complete their training.
   * @param {number} checkDay - The day for which we are checking the training statuses.
   *
   * @return {Array<Datapoint>} - A list of Datapoints, one for each Group.
   */
  
  //  [
  //   { group_id: "a", num_employees: 4, total_days_overdue: 20 },
  //   { group_id: "b", num_employees: 3, total_days_overdue: 10 },
  //   { group_id: "c", num_employees: 1, total_days_overdue: 5 }
  // ]
  /*
      daysLatePerGroup = {
        'a': {
          totalOverDueForGroup: NUMBER,
          employeeCount: NUMBER
        }
      }
    */
  
  // visitedLevel = [['a','b'],[]];
  // function updatedWithGroupings(daysLatePerGroup, groupsById, visitedLevel) {
  //   // base case => parentLevel and children level are visited
  
  
    
  //   let finalGroupedArray = [];
  
    
  //   // resursive
  //   // daysLatePerGroup[parent_level] + daysLatePerGroup[currentLevel] + daysLatePerGroup[childLevel1, childLevel2]
    
  
  //   return finalGroupedArray;
  // }
  
  
  function getTotalDaysOverdueByGroups(
    employees,
    groupsById,
    trainingWindow,
    checkDay
  ) {
    let daysLatePerGroup = {};
    // getTrainingStatus(employee, training_window, check_day) 
    for (let employee of employees) {
      let employeeTrainingStatus = getTrainingStatus(employee, trainingWindow, checkDay)
      let potentialDaysOverdue = employeeTrainingStatus.days_overdue;
      let { group_id } = employee;
      if (daysLatePerGroup[group_id]) {
        daysLatePerGroup[group_id]['totalOverDueForGroup'] += potentialDaysOverdue;
        daysLatePerGroup[group_id]['employeeCount'] += 1;
      } else {
        daysLatePerGroup[group_id] = {
          'totalOverDueForGroup': potentialDaysOverdue,
          'employeeCount': 1
        };
      }
  
      // we know c has 5 days overdue
      // c should go update b
      // only need to update my parents!
      let currentGroupId = groupsById[group_id]['parent_id'];
  
      while (currentGroupId) {
        console.log(`visiting ${group_id} and I'm updating group level ${currentGroupId}`)
        // update
        daysLatePerGroup[currentGroupId]['totalOverDueForGroup'] += potentialDaysOverdue;
        daysLatePerGroup[currentGroupId]['employeeCount'] += 1;
  
        currentGroupId = groupsById[currentGroupId]['parent_id'];
      }
    }
  
    // daysLatePerGroup = {
    //   'a': {
    //     totalOverDueForGroup: NUMBER,
    //     employeeCount: NUMBER
    //   }
    // }
    console.log({ daysLatePerGroup });
    
    return daysLatePerGroup;
  }
  
  // Example:
  const trainingWindow = 10;
  const checkDay = 120;
  
  // Note: In this example, no one did training!
  // { start_day: 100, group_id: "a", trained_day: 100 }
  const employees = [
    { start_day: 100, group_id: "a" }, // days_overdue: 10
    { start_day: 105, group_id: "b" }, // days_overdue: 5
    { start_day: 110, group_id: "b" }, // days_overdue: 0
    { start_day: 105, group_id: "c" }, // days_overdue: 5
  ];
  
  const groupsById = {
    a: { id: "a", child_ids: ["b"] },
    b: { id: "b", parent_id: "a", child_ids: ["c"] },
    c: { id: "c", parent_id: "b", child_ids: [] },
  };
  
  const result = getTotalDaysOverdueByGroups(
    employees,
    groupsById,
    trainingWindow,
    checkDay
  );
  console.log(result);
  
  /*
  Expected Output:
  [
    { group_id: "a", num_employees: 4, total_days_overdue: 20 },
    { group_id: "b", num_employees: 3, total_days_overdue: 10 },
    { group_id: "c", num_employees: 1, total_days_overdue: 5 }
  ]
  */
  