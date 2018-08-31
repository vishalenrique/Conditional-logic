// @flow

//getprocessedfields x
//object assign x.fields to state
//change field cf{name: value}
//check of cf.name exists in x.fieldChangeEffects if(x.fieldChangeEffects[cf.name])
//if not quit
//if yes
//convert x.fieldChangeEffects to array of type FieldChangeEffectRuleType
//loop through FieldChangeEffectRuleTypeArray
//write a function to calculate



const trueCondition = [
  "==",
  {
    type: "boolean",
    value: true
  },
  {
    type: "boolean",
    value: true
  }
];
const pickUpOnCondition = [
  "==",
  {
    type: "var",
    value: ["ready_for_pickup"]
  },
  {
    type: "string",
    value: "P"
  }
];

const readyForPickUpCondition = [
  "and",
  [
    "==",
    {
      type: "var",
      value: ["removed_personal_belongings"]
    },
    {
      type: "string",
      value: "Y"
    }
  ],
  [
    "and",
    [
      "==",
      {
        type: "var",
        value: ["has_keys"]
      },
      {
        type: "string",
        value: "Y"
      }
    ],
    [
      "==",
      {
        type: "var",
        value: ["vehicle_is_blocked"]
      },
      {
        type: "string",
        value: "N"
      }
    ]
  ]
];
export const FIELDS1 = {
  status: "success",
  data: {
    has_keys: {
      readable: trueCondition,
      editable: trueCondition,
      required: trueCondition,
      value: "Y"
    },
    removed_personal_belongings: {
      readable: trueCondition,
      editable: trueCondition,
      required: trueCondition,
      value: "Y"
    },
    vehicle_is_blocked: {
      readable: trueCondition,
      editable: trueCondition,
      required: trueCondition,
      value: "N"
    },
    ready_for_pickup: {
      readable: readyForPickUpCondition,
      editable: readyForPickUpCondition,
      required: readyForPickUpCondition,
      value: "P"
    },
    pick_up_on: {
      readable: pickUpOnCondition,
      editable: pickUpOnCondition,
      required: pickUpOnCondition,
      value: null
    }
  }
};

export const FIELDS = {
  status: "success",
  data: {
    lot_number: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: 54109368
    },
    claim_number: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "TETS"
    },
    reference_number: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "54109368 - Q"
    },
    vehicle_year: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: 2010
    },
    vehicle_make: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "HOND"
    },
    vehicle_model: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "ACCORD"
    },
    vehicle_color: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "RED"
    },
    vin: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: ""
    },
    address: {
      address1: {
        readable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        editable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        required: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        value: "8747 SCHUMACHER LN"
      },
      address2: {
        readable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        editable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        required: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: false
          }
        ],
        value: ""
      },
      city: {
        readable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        editable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        required: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        value: "HOUSTON"
      },
      state: {
        readable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        editable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        required: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        value: "TX"
      },
      zip: {
        readable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        editable: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        required: [
          "==",
          {
            type: "boolean",
            value: true
          },
          {
            type: "boolean",
            value: true
          }
        ],
        value: "77063"
      }
    },
    owner_name: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "TESTT"
    },
    seller_name: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "JUST-TRANSPORTATION-X"
    },
    removed_personal_belongings: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      value: "Y"
    },
    has_keys: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      value: "Y"
    },
    vehicle_is_blocked: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      value: "N"
    },
    ready_for_pickup: {
      readable: [
        "and",
        [
          "!=",
          {
            type: "var",
            value: ["removed_personal_belongings"]
          },
          {
            type: "string",
            value: "need_more_time"
          }
        ],
        [
          "and",
          [
            "!=",
            {
              type: "var",
              value: ["has_keys"]
            },
            {
              type: "string",
              value: "need_more_time"
            }
          ],
          [
            "==",
            {
              type: "var",
              value: ["vehicle_is_blocked"]
            },
            {
              type: "string",
              value: "N"
            }
          ]
        ]
      ],
      editable: [
        "and",
        [
          "!=",
          {
            type: "var",
            value: ["removed_personal_belongings"]
          },
          {
            type: "string",
            value: "need_more_time"
          }
        ],
        [
          "and",
          [
            "!=",
            {
              type: "var",
              value: ["has_keys"]
            },
            {
              type: "string",
              value: "need_more_time"
            }
          ],
          [
            "==",
            {
              type: "var",
              value: ["vehicle_is_blocked"]
            },
            {
              type: "string",
              value: "N"
            }
          ]
        ]
      ],
      required: [
        "and",
        [
          "!=",
          {
            type: "var",
            value: ["removed_personal_belongings"]
          },
          {
            type: "string",
            value: "need_more_time"
          }
        ],
        [
          "and",
          [
            "!=",
            {
              type: "var",
              value: ["has_keys"]
            },
            {
              type: "string",
              value: "need_more_time"
            }
          ],
          [
            "==",
            {
              type: "var",
              value: ["vehicle_is_blocked"]
            },
            {
              type: "string",
              value: "N"
            }
          ]
        ]
      ],
      value: "Y"
    },
    pick_up_on: {
      readable: [
        "and",
        [
          "present",
          {
            type: "var",
            value: ["ready_for_pickup"]
          },
          {}
        ],
        [
          "==",
          {
            type: "var",
            value: ["ready_for_pickup"]
          },
          {
            type: "string",
            value: "pick_up_on"
          }
        ]
      ],
      editable: [
        "and",
        [
          "present",
          {
            type: "var",
            value: ["ready_for_pickup"]
          },
          {}
        ],
        [
          "==",
          {
            type: "var",
            value: ["ready_for_pickup"]
          },
          {
            type: "string",
            value: "pick_up_on"
          }
        ]
      ],
      required: [
        "and",
        [
          "present",
          {
            type: "var",
            value: ["ready_for_pickup"]
          },
          {}
        ],
        [
          "==",
          {
            type: "var",
            value: ["ready_for_pickup"]
          },
          {
            type: "string",
            value: "pick_up_on"
          }
        ]
      ],
      value: null
    },
    follow_up: {
      readable: [
        "or",
        [
          "==",
          {
            type: "var",
            value: ["removed_personal_belongings"]
          },
          {
            type: "string",
            value: "need_more_time"
          }
        ],
        [
          "or",
          [
            "==",
            {
              type: "var",
              value: ["has_keys"]
            },
            {
              type: "string",
              value: "need_more_time"
            }
          ],
          [
            "or",
            [
              "==",
              {
                type: "var",
                value: ["vehicle_is_blocked"]
              },
              {
                type: "string",
                value: "Y"
              }
            ],
            [
              "==",
              {
                type: "var",
                value: ["ready_for_pickup"]
              },
              {
                type: "string",
                value: "follow_up"
              }
            ]
          ]
        ]
      ],
      editable: [
        "or",
        [
          "==",
          {
            type: "var",
            value: ["removed_personal_belongings"]
          },
          {
            type: "string",
            value: "need_more_time"
          }
        ],
        [
          "or",
          [
            "==",
            {
              type: "var",
              value: ["has_keys"]
            },
            {
              type: "string",
              value: "need_more_time"
            }
          ],
          [
            "or",
            [
              "==",
              {
                type: "var",
                value: ["vehicle_is_blocked"]
              },
              {
                type: "string",
                value: "Y"
              }
            ],
            [
              "==",
              {
                type: "var",
                value: ["ready_for_pickup"]
              },
              {
                type: "string",
                value: "follow_up"
              }
            ]
          ]
        ]
      ],
      required: [
        "or",
        [
          "==",
          {
            type: "var",
            value: ["removed_personal_belongings"]
          },
          {
            type: "string",
            value: "need_more_time"
          }
        ],
        [
          "or",
          [
            "==",
            {
              type: "var",
              value: ["has_keys"]
            },
            {
              type: "string",
              value: "need_more_time"
            }
          ],
          [
            "or",
            [
              "==",
              {
                type: "var",
                value: ["vehicle_is_blocked"]
              },
              {
                type: "string",
                value: "Y"
              }
            ],
            [
              "==",
              {
                type: "var",
                value: ["ready_for_pickup"]
              },
              {
                type: "string",
                value: "follow_up"
              }
            ]
          ]
        ]
      ],
      value: null
    },
    comments: {
      readable: [
        "present",
        {
          type: "var",
          value: ["follow_up"]
        },
        {}
      ],
      editable: [
        "present",
        {
          type: "var",
          value: ["follow_up"]
        },
        {}
      ],
      required: [
        "and",
        [
          "present",
          {
            type: "var",
            value: ["follow_up"]
          },
          {}
        ],
        [
          "or",
          [
            "==",
            {
              type: "var",
              value: ["follow_up"]
            },
            {
              type: "string",
              value: "NA"
            }
          ],
          [
            "==",
            {
              type: "var",
              value: ["ready_for_pickup"]
            },
            {
              type: "string",
              value: "follow_up"
            }
          ]
        ]
      ],
      value: null
    },
    is_submitted: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: true
    },
    message: {
      readable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: true
        }
      ],
      editable: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      required: [
        "==",
        {
          type: "boolean",
          value: true
        },
        {
          type: "boolean",
          value: false
        }
      ],
      value: "translation missing: en.cfr_comm_pro.common.errors.delivered"
    }
  },
  yard_phone_number: "+1-281-214-7800"
};
