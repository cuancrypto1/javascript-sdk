const data = [
  {
    "key": "rollout-colours",
    "value": "blue",
    "is_rollout": true,
    "rollouts": [
      {
        "value": "orange",
        "percentage": 20
      },
      {
        "value": "yellow",
        "percentage": 20
      },
      {
        "value": "green",
        "percentage": 20
      },
      {
        "value": "blue",
        "percentage": 20
      },
      {
        "value": "red",
        "percentage": 20
      }
    ],
    "is_targeting_enabled": false,
    "targets": []
  },
  {
    "key": "colours",
    "value": "red",
    "is_rollout": false,
    "rollouts": [],
    "is_targeting_enabled": true,
    "targets": [
      {
        "value": "yellow",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Name",
            "comparator": 1,
            "values": [ "PETER Parker" ]
          }
        ]
      },
      {
        "value": "orange",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Name",
            "comparator": 2,
            "values": [ "Thor" ]
          }
        ]
      },
      {
        "value": "blue",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Score1",
            "comparator": 3,
            "values": [ "40" ]
          }
        ]
      },
      {
        "value": "green",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Score2",
            "comparator": 4,
            "values": [ "135" ]
          }
        ]
      },
      {
        "value": "yellow",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Score3",
            "comparator": 5,
            "values": [ "40" ]
          }
        ]
      },
      {
        "value": "blue",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Score4",
            "comparator": 6,
            "values": [ "120" ]
          }
        ]
      },
      {
        "value": "green",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Email",
            "comparator": 7,
            "values": [ "@gmail.com" ]
          }
        ]
      },
      {
        "value": "yellow",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Email",
            "comparator": 8,
            "values": [ "@yahoo.com" ]
          }
        ]
      },
      {
        "value": "yellow",
        "is_rollout": false,
        "rollouts": [],
        "rules": [
          {
            "attribute": "Country",
            "comparator": 9,
            "values": [ "kingdom" ]
          }
        ]
      }
    ]
  }
];

export default data;