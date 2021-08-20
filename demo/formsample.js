import {DWKitForm} from './build/optimajet-form';
import React from 'react';
import ReactDOM from 'react-dom';
import {validate} from './build/optimajet-form';
import ajaxInterceptor from './ajaxinterceptor'

// ajaxInterceptor.configureHeaders("accessToken");

const formName = 'Demo';
const data = {
    title: 'Test application',
    firstname: 'John',
    lastname: 'Doe',
    type: 2,
    comment: 'This is a test application for John Doe'
};

const errors = {};

const model = [
    {
        key: 'header_1',
        'data-buildertype': 'header',
        content: 'Application Form',
        size: 'medium',
        subheader: 'Make it easier',
        textAlign: 'center'
    },
    {
        key: 'form_1',
        'data-buildertype': 'form',
        children: [
            {
                key: 'title',
                'data-buildertype': 'input',
                label: 'Title',
                fluid: true,
                'other-required': false
            },
            {
                key: 'formgroup_1',
                'data-buildertype': 'formgroup',
                widths: 'equal',
                children: [
                    {
                        key: 'firstname',
                        'data-buildertype': 'input',
                        label: 'First name',
                        fluid: true
                    },
                    {
                        key: 'lastname',
                        'data-buildertype': 'input',
                        label: 'Last name',
                        fluid: true
                    }
                ]
            },
            {
                key: 'type',
                'data-buildertype': 'dropdown',
                label: 'Type',
                fluid: true,
                selection: true,
                'data-elements': '[{key: 0, value: \'\', text: \'\'},\n{key: 1, value: 1, text: \'Internal\'},\n{key: 2, value: 2, text: \'External\'},\n{key: 3, value: 2, text: \'Direct\'}]',
                placeholder: ''
            },
            {
                key: 'comment',
                'data-buildertype': 'textarea',
                label: 'Comment',
                fluid: true,
                rows: 5
            }
        ],
        events: {},
        'style-marginBottom': '10px'
    },
    {
        key: 'btnSave',
        'data-buildertype': 'button',
        content: 'Save',
        primary: true,
        fluid: false,
        'events-onclick-actions': [
            'validate',
            'saveandexit'
        ],
        events: {
            onClick: {
                active: true,
                actions: [
                    'save'
                ],
                targets: [],
                parameters: []
            }
        }
    },
    {
        key: 'btnCancel',
        'data-buildertype': 'button',
        content: 'Cancel',
        primary: false,
        fluid: false,
        'events-onclick-actions': [
            'validate',
            'saveandexit'
        ],
        events: {
            onClick: {
                active: true,
                actions: [
                    'cancel'
                ],
                targets: [],
                parameters: []
            }
        }
    }
];

const form = <DWKitForm
    formName={formName}
    data={data}
    model={model}
    errors={errors}
    dataChanged={(form, { key, value }) => {
        console.log('dataChanged', 'form:', form, 'key:', key, 'value:', value);
    }}
    eventFunc={(args) => {
        console.log('eventFunc', args);

        if(Array.isArray(args.actions) && args.actions.includes("initSystem") &&
            args.parameters && args.parameters["initialData"])
        {
            var initialData = args.parameters["initialData"];
            for(var field in initialData){
                if(!data[field]){
                    data[field] = initialData[field];
                }
            }
            //let {valid, errors} = validate(args.component.props);
            //args.component.setState({errors});
            args.component.checkConditions(args.component.props.model);
        }

        if(Array.isArray(args.actions) && args.actions.includes("validate")) {
            let {valid, errors} = validate(args.component.props);
            args.component.setState({errors});

            if (!valid) throw new Error("Invalid data");
        }

        console.log("Execute next action...");
    }}
    getAdditionalDataForControl={(control, { startIndex, pageSize, filters, sort, model }, callback) => {
        console.log('getAdditionalDataForControl');
    }}
    hideControls={[]}
    readOnlyControls={[]}
    readOnly={false}
    uploadUrl={''}
    downloadUrl={''}
    autoCheckConditions={true}
    autoValidate={true}
/>;

ReactDOM.render(form, document.getElementById('container'));

