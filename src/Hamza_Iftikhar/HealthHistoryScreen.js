import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, Button } from "react-native";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from "react-native-paper";

import AnimatedLoader from "react-native-animated-loader";

import MyHeader from './MyHeader';
import MyCheckBox from './MyCheckBox';
import axios from "axios";

export default class HealthHistoryScreen extends React.Component
{
    state = {
        problemsList_poorImmunity : false, problemsList_acidity : false, problemsList_constipation : false, problemsList_diarrhoea : false, problemsList_leakyGut : false, problemsList_IBS : false, problemsList_autoImmuneDisease : false, problemsList_foodAllergies : false, problemsList_insulinResistance : false,
        personalInfo_address : "", personalInfo_phoneNo : "", personalInfo_age : "", personalInfo_gender : "Male", personalInfo_height : "",
        dob : new Date(),
        weight_current : '', weight_sixMonthsAgo : '', weight_oneYearAgo : '', weight_differentWeightRequired : '', weight_intentLost : '', weight_relationshipStatus : 'Single', weight_childern : '', weight_occupation : '', weight_lineOfWork : '', weight_stressAtWork : '', weight_workHours : '', weight_domesticLife : '', weight_healthConcerns : '', weight_diagnosed : '', weight_medication : '', weight_supplements : '', weight_familyMemberProblem : '',
        bloodInfo_bloodType : '', bloodInfo_takingBirthControlPills : '', bloodInfo_menstrualCycle : '',
        gutDiseaseInfo_constipationOrDiarrhoeaOrGasDetails : '', gutDiseaseInfo_constipationOrDiarrhoeaOrGasDuration : '',
        physicalInfo_foodAllergies : '', physicalInfo_physicallyActive : '', physicalInfo_dailyExercise : '', physicalInfo_exerciseDetails : '',
        foodDetails_breakToDinnerEatingRoutine : '',
        exerciseDetails_morning : '', exerciseDetails_afternoon : '', exerciseDetails_evening : '', exerciseDetails_night : '', exerciseDetails_duration : '',
        portionSize : '', waterQuantity : '', drinking : '', smoking : '', useSoftDrinks : '', drinkingRoutine : '',
        majorAddiction : '', foodOrSugarOrDrugs : '', eatOutOrHome : '', eatMoreWhenUpset : '', eatMoreWhenUpsetReason : '',
        relevantInformationAvailable : '', relevantInformationDetails : '',
        visible : false
    }

    submitResponse()
    {
        const data = 
        { 
            'poorImmunity': this.state.problemsList_poorImmunity ? 'Yes' : 'No',
            'acidity': this.state.problemsList_acidity ? 'Yes' : 'No',
            'constipation': this.state.problemsList_constipation ? 'Yes' : 'No',
            'diarrhoea': this.state.problemsList_diarrhoea ? 'Yes' : 'No',
            'leakyGut': this.state.problemsList_leakyGut ? 'Yes' : 'No',
            'diagnosedIBS': this.state.problemsList_IBS ? 'Yes' : 'No',
            'immuneDiseases': this.state.problemsList_autoImmuneDisease ? 'Yes' : 'No',
            'foodAlergies': this.state.problemsList_foodAllergies ? 'Yes' : 'No',
            'insulinResistance': this.state.problemsList_insulinResistance ? 'Yes' : 'No',
            'adress': this.state.personalInfo_address,
            'whatsapp': this.state.personalInfo_phoneNo,
            'age': this.state.personalInfo_age,
            'gender': this.state.personalInfo_gender,
            'height': this.state.personalInfo_height,
            'dob': this.state.dob,
            'currentWeigt': this.state.weight_current,
            'weightSixMonthBefore': this.state.weight_sixMonthsAgo,
            'weighOneYearBefore': this.state.weight_oneYearAgo,
            'weightDifferent': this.state.weight_differentWeightRequired,
            'intentLose': this.state.weight_intentLost,
            'relationship': this.state.weight_relationshipStatus,
            'children': this.state.weight_childern,
            'occupation': this.state.weight_occupation,
            'lineOfWork': this.state.weight_lineOfWork,
            'stressOnWork': this.state.weight_stressAtWork,
            'workHour': this.state.weight_workHours,
            'demesticLife': this.state.weight_domesticLife,
            'healthConcerns': this.state.weight_healthConcerns,
            'diagnosed': this.state.weight_diagnosed, 
            'medication': this.state.weight_medication, 
            'suppliments': this.state.weight_supplements,
            'helathProblem': this.state.weight_familyMemberProblem,
            'bloodGroop': this.state.bloodInfo_bloodType,
            'controlpills': this.state.bloodInfo_takingBirthControlPills,
            'menstrualCycle': this.state.bloodInfo_menstrualCycle,
            'allergiesOrSensitivities': this.state.gutDiseaseInfo_constipationOrDiarrhoeaOrGasDetails,
            'howLongAllergiesOrSensitivities': this.state.gutDiseaseInfo_constipationOrDiarrhoeaOrGasDuration,
            'foodAllergies': this.state.physicalInfo_foodAllergies,
            'physicallyActive': this.state.physicalInfo_physicallyActive,
            'dailyExercise': this.state.physicalInfo_dailyExercise,
            'foodTiming': this.state.foodDetails_breakToDinnerEatingRoutine,
            'exerciseTimeMoring': this.state.exerciseDetails_morning,
            'exerciseTimeAfternoon': this.state.exerciseDetails_afternoon,
            'exerciseTimeEvening': this.state.exerciseDetails_evening,
            'exerciseTimeNight': this.state.exerciseDetails_night,
            'exerciseFrom': this.state.exerciseDetails_duration,
            'exercisePortionSize': this.state.portionSize,
            'waterQuantity': this.state.waterQuantity,
            'consumeDrink': this.state.drinking ? 'Yes' : 'No',
            'consumeSmoking': this.state.smoking ? 'Yes' : 'No',
            'consumeSoftDrink': this.state.useSoftDrinks ? 'Yes' : 'No',
            'consumeDrinkFrom': this.state.drinkingRoutine,
            'addiction': this.state.majorAddiction,
            'foodSugarDrugs': this.state.foodOrSugarOrDrugs,
            'eatFrom': this.state.eatOutOrHome,
            'dailyEatMoreWhenUpset': this.state.eatMoreWhenUpset,
            'teachMore': this.state.eatMoreWhenUpsetReason,
            'relevantInfoDescription': this.state.relevantInformationDetails,
            'user_id': this.props.route.params.userId
        };

        this.setState({visible : true});

        const headers = { 
            'Authorization': 'Bearer ' + this.props.route.params.token,
            'content-type':'application/json'
        };

        axios.post('https://thefoodpharmacy.general.greengrapez.com/api/auth/history', data, {headers}).
        then(response => {
            if(response.data["status"] === "error")
            {
                this.setState({visible : false});
                Alert.alert("Error", response.data["response"]);
            }

            if(response.data["status"] === "okay")
            {
                this.setState({visible : false});
                Alert.alert("Submission Status", "Data submitted successfully", [{text : "Ok", onPress : () => this.props.navigation.goBack(), style : 'default'}]);
            }
        }).
        catch(error => {
            this.setState({visible : false});
            Alert.alert("Error", error.message);
        });
    }

    getTodayDate()
    {
        var today = new Date();
        return (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
    }

    renderProblemsList()
    {
        return(
            <View>
                <MyCheckBox title = "Poor immunity," themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_poorImmunity} onIconPress = {() => this.setState({problemsList_poorImmunity : !this.state.problemsList_poorImmunity})}/>
                <MyCheckBox title = "Acidity," themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_acidity} onIconPress = {() => this.setState({problemsList_acidity : !this.state.problemsList_acidity})}/>
                <MyCheckBox title = "Constipation," themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_constipation} onIconPress = {() => this.setState({problemsList_constipation : !this.state.problemsList_constipation})}/>
                <MyCheckBox title = "Diarrhoea," themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_diarrhoea} onIconPress = {() => this.setState({problemsList_diarrhoea : !this.state.problemsList_diarrhoea})}/>
                <MyCheckBox title = "Leaky Gut which is the precursor to:" themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_leakyGut} onIconPress = {() => this.setState({problemsList_leakyGut : !this.state.problemsList_leakyGut})}/>
                <MyCheckBox title = "Diagnosed IBS" themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_IBS} onIconPress = {() => this.setState({problemsList_IBS : !this.state.problemsList_IBS})}/>
                <MyCheckBox title = "Auto-immune diseases" themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_autoImmuneDisease} onIconPress = {() => this.setState({problemsList_autoImmuneDisease : !this.state.problemsList_autoImmuneDisease})}/>
                <MyCheckBox title = "Food allergies and intolerance" themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_foodAllergies} onIconPress = {() => this.setState({problemsList_foodAllergies : !this.state.problemsList_foodAllergies})}/>
                <MyCheckBox title = "Insuline resistance" themeColor = {this.props.route.params.themeColor} checked = {this.state.problemsList_insulinResistance} onIconPress = {() => this.setState({problemsList_insulinResistance : !this.state.problemsList_insulinResistance})}/>
            </View>
        );
    }

    renderPersonalInfo()
    {
        return(
            <View style = {{marginTop : 50}}>
                <Text style = {styles.labelInputText}>Address:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({personalInfo_address : value})} value = {this.state.personalInfo_address}/>

                <Text style = {styles.labelInputText}>Phone No:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({personalInfo_phoneNo : value})} value = {this.state.personalInfo_phoneNo}/>

                <Text style = {styles.labelInputText}>Age:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({personalInfo_age : value})} value = {this.state.personalInfo_age}/>

                <Text style = {styles.labelInputText}>Gender:</Text>
                <View style={{ height : 40, borderWidth: 1, borderColor : 'black', justifyContent : 'center'}}>
                    <Picker
                        selectedValue = {this.state.personalInfo_gender}
                        mode = 'dropdown'
                        onValueChange = {(value) => this.setState({personalInfo_gender : value})}
                        style = {{height : 40}}>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>

                <Text style = {styles.labelInputText}>Height:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({personalInfo_height : value})} value = {this.state.personalInfo_height}/>

                <Text style = {styles.labelInputText}>DOB:</Text>
                <DatePicker
                    style={styles.datePicker}
                    date={this.state.dob}
                    mode="date"
                    placeholder="select date"
                    format="MM-DD-YYYY"
                    minDate="01-01-1900"
                    maxDate={this.getTodayDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={(date) => {this.setState({dob: date})}}
                />
            </View>
        );
    }

    renderWeightInformation()
    {
        return(
            <View>
                <Text style = {styles.labelInputText}>Current Weight:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_current : value})} value = {this.state.weight_current}/>

                <Text style = {styles.labelInputText}>Weight 6 months ago:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_sixMonthsAgo : value})} value = {this.state.weight_sixMonthsAgo}/>

                <Text style = {styles.labelInputText}>Weight 1 year ago:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_oneYearAgo : value})} value = {this.state.weight_oneYearAgo}/>

                <Text style = {styles.labelInputText}>Would you like your weight to be different?</Text>

                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.weight_differentWeightRequired === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({weight_differentWeightRequired : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.weight_differentWeightRequired === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({weight_differentWeightRequired : 'No'})}/>
                </View>

                {this.state.weight_differentWeightRequired === 'Yes' ? (
                    <View>
                        <Text style = {styles.labelInputText}>How to do you intend to lose?</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_intentLost : value})} value = {this.state.weight_intentLost}/>

                        <Text style = {styles.labelInputText}>Relationship Status</Text>
                        <View style={{ height : 40, borderWidth: 1, borderColor : 'black', justifyContent : 'center'}}>
                            <Picker
                                selectedValue = {this.state.weight_relationshipStatus}
                                mode = 'dropdown'
                                onValueChange = {(value) => this.setState({weight_relationshipStatus : value})}
                                style = {{height : 40}}>
                                    <Picker.Item label="Single" value="Single" />
                                    <Picker.Item label="Married" value="Married" />
                            </Picker>
                        </View>

                        <Text style = {styles.labelInputText}>Children</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_childern : value})} value = {this.state.weight_childern}/>

                        <Text style = {styles.labelInputText}>Occupation</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_occupation : value})} value = {this.state.weight_occupation}/>

                        <Text style = {styles.labelInputText}>Do you like your line of work?</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_lineOfWork : value})} value = {this.state.weight_lineOfWork}/>

                        <Text style = {styles.labelInputText}>How much stress do you face at work? Please describe.</Text>
                        <TextInput style = {styles.textInputMultiLine} multiline = {true} placeholder = '' onChangeText = {(value) => this.setState({weight_stressAtWork : value})} value = {this.state.weight_stressAtWork}/>

                        <Text style = {styles.labelInputText}>Do you work long hours?</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_workHours : value})} value = {this.state.weight_workHours}/>

                        <Text style = {styles.labelInputText}>Describe your domestic life?</Text>
                        <TextInput style = {styles.textInputMultiLine} multiline = {true} placeholder = '' onChangeText = {(value) => this.setState({weight_domesticLife : value})} value = {this.state.weight_domesticLife}/>

                        <Text style = {styles.labelInputText}>Please list your main gut health concerns?</Text>
                        <TextInput style = {styles.textInputMultiLine} multiline = {true} placeholder = '' onChangeText = {(value) => this.setState({weight_healthConcerns : value})} value = {this.state.weight_healthConcerns}/>

                        <Text style = {styles.labelInputText}>When were you diagnosed?</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_diagnosed : value})} value = {this.state.weight_diagnosed}/>

                        <Text style = {styles.labelInputText}>What medication are you taking if any?</Text>
                        <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({weight_medication : value})} value = {this.state.weight_medication}/>

                        <Text style = {styles.labelInputText}>What supplements are you taking if any?</Text>
                        <TextInput style = {styles.textInputMultiLine} multiline = {true} placeholder = '' onChangeText = {(value) => this.setState({weight_supplements : value})} value = {this.state.weight_supplements}/>
                    </View>
                    ) : null
                }

                <Text style = {styles.labelInputText}>Are there members of your family with the same gut health problem?</Text>

                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.weight_familyMemberProblem === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({weight_familyMemberProblem : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.weight_familyMemberProblem === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({weight_familyMemberProblem : 'No'})}/>
                </View>
            </View>
        );
    }

    renderBloodInformation()
    {
        return(
            <View>
                <Text style = {styles.labelInputText}>What is your blood type?</Text>
                <View style={{ height : 40, borderWidth: 1, borderColor : 'black', justifyContent : 'center'}}>
                    <Picker
                        value= {this.state.bloodInfo_bloodType}
                        mode = 'dropdown'
                        onValueChange = {(value) => this.setState({bloodInfo_bloodType : value})}
                        style = {{height : 40}}>
                            <Picker.Item label="A+" value="A+" />
                            <Picker.Item label="A-" value="A-" />
                            <Picker.Item label="B+" value="B+" />
                            <Picker.Item label="B-" value="B-" />
                            <Picker.Item label="AB+" value="AB+" />
                            <Picker.Item label="AB-" value="AB-" />
                            <Picker.Item label="O+" value="O+" />
                            <Picker.Item label="O-" value="O-" />
                    </Picker>
                </View>

                <Text style = {styles.labelInputText}>Are you taking hormone birth control pills?</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.bloodInfo_takingBirthControlPills === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({bloodInfo_takingBirthControlPills : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.bloodInfo_takingBirthControlPills === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({bloodInfo_takingBirthControlPills : 'No'})}/>
                </View>

                <Text style = {styles.labelInputText}>(Females only) Describe your menstrual cycle:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({bloodInfo_menstrualCycle : value})} value = {this.state.bloodInfo_menstrualCycle}/>
            </View>
        );
    }

    renderGutDiseaseInfo()
    {
        return(
            <View>
                <Text style = {[styles.labelInputText, {color : this.props.route.params.themeColor}]}>Describe your digestion; constipation/ diarrhoea/gas? And for how long has it been this way? Do you have any food allergies or sensitivies?</Text>

                <Text style = {styles.labelInputText}>Details about your constipation/ Diarrhoea/ Gas:</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({gutDiseaseInfo_constipationOrDiarrhoeaOrGasDetails : value})} value = {this.state.gutDiseaseInfo_constipationOrDiarrhoeaOrGasDetails}/>

                <Text style = {styles.labelInputText}>How long it has been this way?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({gutDiseaseInfo_constipationOrDiarrhoeaOrGasDuration : value})} value = {this.state.gutDiseaseInfo_constipationOrDiarrhoeaOrGasDuration}/>
            </View>
        );
    }

    renderPhysicalInfo()
    {
        return(
            <View>
                <Text style = {styles.labelInputText}>Do you have any food allergies or sensitivities?</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.physicalInfo_foodAllergies === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({physicalInfo_foodAllergies : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.physicalInfo_foodAllergies === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({physicalInfo_foodAllergies : 'No'})}/>
                </View>

                <Text style = {styles.labelInputText}>Are you physically active?</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.physicalInfo_physicallyActive === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({physicalInfo_physicallyActive : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.physicalInfo_physicallyActive === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({physicalInfo_physicallyActive : 'No'})}/>
                </View>

                <Text style = {styles.labelInputText}>Do you engage in any daily exercise? If so please describe. If you don't please explain why.</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.physicalInfo_dailyExercise === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({physicalInfo_dailyExercise : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.physicalInfo_dailyExercise === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({physicalInfo_dailyExercise : 'No'})}/>
                </View>
                <TextInput style = {styles.textInputMultiLine} placeholder = '' multiline = {true} onChangeText = {(value) => this.setState({physicalInfo_exerciseDetails : value})} value = {this.state.physicalInfo_exerciseDetails}/>
            </View>
        );
    }

    renderFoodDetails()
    {
        return(
            <View>
                <Text style = {[styles.labelInputText, {color : this.props.route.params.themeColor}]}>Food.{'\n'}Please describe with timings in detail.</Text>

                <Text style = {styles.labelInputText}>What you eat and drink for breakfast through to dinner.</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({foodDetails_breakToDinnerEatingRoutine : value})} value = {this.state.foodDetails_breakToDinnerEatingRoutine}/>

                <Text style = {styles.labelInputText}>What time you exercise if you do so?</Text>
                <MyCheckBox title = "Morning" themeColor = {this.props.route.params.themeColor} checked = {this.state.exerciseDetails_morning} onIconPress = {() => this.setState({exerciseDetails_morning : !this.state.exerciseDetails_morning})}/>
                <MyCheckBox title = "Afternoon" themeColor = {this.props.route.params.themeColor} checked = {this.state.exerciseDetails_afternoon} onIconPress = {() => this.setState({exerciseDetails_afternoon : !this.state.exerciseDetails_afternoon})}/>
                <MyCheckBox title = "Evening" themeColor = {this.props.route.params.themeColor} checked = {this.state.exerciseDetails_evening} onIconPress = {() => this.setState({exerciseDetails_evening : !this.state.exerciseDetails_evening})}/>
                <MyCheckBox title = "Night" themeColor = {this.props.route.params.themeColor} checked = {this.state.exerciseDetails_night} onIconPress = {() => this.setState({exerciseDetails_night : !this.state.exerciseDetails_night})}/>

                <Text style = {styles.labelInputText}>And for how long.</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({exerciseDetails_duration : value})} value = {this.state.exerciseDetails_duration}/>
            </View>
        );
    }

    renderDrugsDetails()
    {
        return(
            <View>
                <Text style = {styles.labelInputText}>Describe your portion size?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({portionSize : value})} value = {this.state.portionSize}/>

                <Text style = {styles.labelInputText}>How much water do you drink in a day?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({waterQuantity : value})} value = {this.state.waterQuantity}/>

                <Text style = {styles.labelInputText}>Do you drink or smoke or consume soft drinks?</Text>
                <View style = {{flexDirection : 'row'}}>
                    <MyCheckBox title = "Drink" themeColor = {this.props.route.params.themeColor} checked = {this.state.drinking} onIconPress = {() => this.setState({drinking : !this.state.drinking})}/>
                    <MyCheckBox title = "Smoke" themeColor = {this.props.route.params.themeColor} checked = {this.state.smoking} onIconPress = {() => this.setState({smoking : !this.state.smoking})}/>
                    <MyCheckBox title = "Soft Drinks" themeColor = {this.props.route.params.themeColor} checked = {this.state.useSoftDrinks} onIconPress = {() => this.setState({useSoftDrinks : !this.state.useSoftDrinks})}/>
                </View>

                <Text style = {styles.labelInputText}>How often?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({drinkingRoutine : value})} value = {this.state.drinkingRoutine}/>

                <Text style = {styles.labelInputText}>Do you have any major addictions?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({majorAddiction : value})} value = {this.state.majorAddiction}/>

                <Text style = {styles.labelInputText}>Food or sugar or drugs?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({foodOrSugarOrDrugs : value})} value = {this.state.foodOrSugarOrDrugs}/>

                <Text style = {styles.labelInputText}>Do you eat out a lot, or cook at home?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({eatOutOrHome : value})} value = {this.state.eatOutOrHome}/>

                <Text style = {styles.labelInputText}>Do you eat more when you are upset or stressed or angry?</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.eatMoreWhenUpset === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({eatMoreWhenUpset : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.eatMoreWhenUpset === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({eatMoreWhenUpset : 'No'})}/>
                </View>

                <Text style = {styles.labelInputText}>If so what do you teach for?</Text>
                <TextInput style = {styles.textInputSimple} placeholder = '' onChangeText = {(value) => this.setState({eatMoreWhenUpsetReason : value})} value = {this.state.eatMoreWhenUpsetReason}/>

                <Text style = {styles.labelInputText}>Is there any other relevant information I need to know?</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.labelInputText}>Yes</Text>
                    <RadioButton 
                    value = "Yes"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.relevantInformationAvailable === 'Yes' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({relevantInformationAvailable : 'Yes'})}/>

                    <Text style = {styles.labelInputText}>No</Text>
                    <RadioButton 
                    value = "No"
                    color = {this.props.route.params.themeColor}
                    status = {this.state.relevantInformationAvailable === 'No' ? 'checked' : 'unchecked'}
                    onPress = {() => this.setState({relevantInformationAvailable : 'No'})}/>
                </View>
                
                {this.state.relevantInformationAvailable === 'Yes' ? (
                    <TextInput style = {styles.textInputMultiLine} multiline = {true} placeholder = '' onChangeText = {(value) => this.setState({relevantInformationDetails : value})} value = {this.state.relevantInformationDetails}/>
                    ) : null
                }
            </View>
        );
    }

    renderSubmitButton()
    {
        return(
            <View style = {{marginTop : 50}}>
                <Button
                    title = "Submit"
                    color = {this.props.route.params.themeColor}
                    onPress = {() => this.submitResponse()}
                />
            </View>
        );
    }

    renderLoader()
    {
        return(
            <View>
                {
                    this.state.visible ? (
                    <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                    >
                        <Text> Submitting...</Text>
                    </AnimatedLoader>            
                    ):(null)
                }
            </View>
        );
    }

    render()
    {
        return(
            <View>
                <MyHeader themeColor = {this.props.route.params.themeColor} navigation = {this.props.navigation} homeScreen = {false}/>
                
                <ScrollView style = {{backgroundColor : '#fff'}}>
                    <View style = {styles.container}>
                        <Text style = {[styles.headerText, {color : this.props.route.params.themeColor}]}>
                                HEALTH HISTORY FORM:
                        </Text>
                        <Text style = {[styles.labelText]}>
                                Health History for Female/Male for Gut Health targeting problems including:
                        </Text>

                        {this.renderProblemsList()}
                        {this.renderPersonalInfo()}
                        {this.renderWeightInformation()}
                        {this.renderBloodInformation()}
                        {this.renderGutDiseaseInfo()}
                        {this.renderPhysicalInfo()}
                        {this.renderFoodDetails()}
                        {this.renderDrugsDetails()}
                        {this.renderSubmitButton()}
                        {this.renderLoader()}
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex : 1,
        flexDirection : 'column',
        padding : 20,
        marginBottom : 50
    },
    headerText:
    {
        textAlign: "left",
        marginBottom: 10,
        fontSize: 15
    },
    labelText:
    {
        textAlign: "left",
        marginBottom: 5,
        fontSize: 13
    },
    labelInputText:
    {
        textAlign : 'left',
        marginVertical : 10,
        fontSize : 13
    },
    textInputSimple: {
        height: 40,
        borderWidth: 1,
        borderColor : 'black',
        textAlign : 'left'
    },
    textInputMultiLine:
    {
        height: 160,
        borderWidth: 1,
        borderColor : 'black',
        textAlign : 'left'
    },
    datePicker:
    {
        height : 40,
        borderColor : 'black',
        borderWidth : 1,
        width : "100%"
    },
    button : 
    {
        marginVertical : 10
    },
    lottie : 
    {
        height : 100,
        width : 100
    }
});