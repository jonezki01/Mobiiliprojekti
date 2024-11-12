
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { TextInput, useTheme } from "react-native-paper";
import LetterAvatar from "../components/Avatar";
import { CURRENCY_API_KEY } from "@env"
import currencyapi from '@everapi/currencyapi-js'
import Dropdown from "../components/DropDown";

export default function CurrencyCalculator({ navigation }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const theme = useTheme(isDarkTheme);
    const [Valuutta] = useState(["USD", "GBP", "JPY", "AUD", "CAD", "EUR"]);
    const [selectedValuuttaFrom, setSelectedValuuttaFrom] = useState("EUR");
    const [selectedValuuttaTo, setSelectedValuuttaTo] = useState("USD");

    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [Rates, setRates] = useState({});

    useEffect(() => {
        if (selectedValuuttaFrom && selectedValuuttaTo) {
            console.log("Fetching conversion rate for:", selectedValuuttaFrom, "to", selectedValuuttaTo);
            fetchRate();
        }
    }, [selectedValuuttaFrom, selectedValuuttaTo]);

        // Haetaan kurssivaluutta jos se ei ole cachessä
        const fetchRate = (rateKey) => {
            if (!Rates[rateKey]) {
                if (!CURRENCY_API_KEY) {
                    console.error("Currency API key not found. Please add it to your .env file.");
                    return;
                }
                const client = new currencyapi(CURRENCY_API_KEY);
                client.latest({
                    base_currency: selectedValuuttaFrom,
                    currencies: selectedValuuttaTo
                })
                .then((response) => {
                    const rate = response.data?.[selectedValuuttaTo]?.value;
                    if (rate) {
                        setRates((prevRate) => ({
                            ...prevRate,
                            [rateKey]: rate
                        }));
                        convertFrom(fromAmount, rate); // Muunnetaan uudella kurssivaluutalla
                    }
                })
                .catch((error) => console.error("error in conversion rate:", error)); 
            } else {
                convertFrom(fromAmount, Rates[rateKey]);
                console.log("Using cached rate for conversion:", Rates[rateKey]);
            }
        };

        // Konvertoidaan fromAmountista ToAmounttin 
        const convertFrom = (amount, rate) => {
            if (isNaN(amount) || !rate) return;
            const convertedAmount = parseFloat(amount) * rate;
            setFromAmount(amount);
            setToAmount(convertedAmount.toFixed(2).toString());
        };

        // Konvertoidaan ToAmountinsta fromAmountiin
        const convertTo = (amount, rate) => {
            if (isNaN(amount) || !rate) return;
            const convertedAmount = parseFloat(amount) / rate;
            setToAmount(amount);
            setFromAmount(convertedAmount.toFixed(2).toString());
        };

        //Handletään muunnokset fromAmountista ja tarkistetaan cache ennen kuin haetaan
        const handleFromAmountChange = (amount) => {
            setFromAmount(amount);
            const rateKey = `${selectedValuuttaFrom}_${selectedValuuttaTo}`;
            const rate = Rates[rateKey];
            if (rate) {
                convertFrom(amount, rate); // Käytetään cachessa olevaa Ratea
            } else {
                fetchRate(rateKey);
            }
        };

        // Handletään muunnokset ToAmountista ja tarkistetaan cache ennen kuin haetaan
        const handleToAmountChange = (amount) => {
            setToAmount(amount);
            const rateKey = `${selectedValuuttaFrom}_${selectedValuuttaTo}`;
            const rate = Rates[rateKey];
            if (rate) {
                convertTo(amount, rate);
            } else {
                fetchRate(rateKey);
            }
        }

    
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

                <View style={[styles.content, { backgroundColor: theme.colors.primary }]}>
                    <View style={styles.component}>
                        <Text style={styles.TopText}>Amount</Text>
                        <View style={styles.componetRow}>
                            <LetterAvatar content={selectedValuuttaFrom.charAt(0)} />
                            <Dropdown
                                items={Valuutta.map((currency) => ({ label: currency, value: currency }))}
                                selectedValue={selectedValuuttaFrom}
                                onValueChange={(value) => setSelectedValuuttaFrom(value)}
                            />

                            <TextInput
                                style={styles.input}
                                value={fromAmount}
                                onChangeText={handleFromAmountChange}
                                placeholder="Enter amount"
                                keyboardType="numeric"
                            />

                        </View>

                        <View style={styles.divider}>
                        </View>
                        <Text style={styles.TopText2}>Converted amount</Text>
                        <View style={styles.componetRow}>
                            <LetterAvatar content={selectedValuuttaTo.charAt(0)} /> 
                            <Dropdown
                                items={Valuutta.map((currency) => ({ label: currency, value: currency }))}
                                selectedValue={selectedValuuttaTo}
                                onValueChange={(value) => setSelectedValuuttaTo(value)}
                            />
                            <TextInput
                                style={styles.input}
                                value={toAmount}
                                onChangeText={handleToAmountChange}
                                placeholder="Converted amount"
                                keyboardType="numeric"
                                
                            />
                        </View>
                    </View>
                </View>

            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
        marginBottom: 40,
    },
    component: {
        backgroundColor: '#ffffff',
        height: 300,
        borderRadius: 30,
        marginVertical: 30,
        marginHorizontal: 20,
    },
    TopText: {
        marginLeft: 20,
        marginTop: 20,
        color: "#b3b5b4",
    },
    TopText2: {
        marginLeft: 20,
        marginTop: 20,
        color: "#b3b5b4",
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
    },
    componetRow: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
    input: {
        height: 40,
        width: 100,
        backgroundColor: "#d4d6d5",
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    divider: {
        height: 2,
        backgroundColor: '#cacbcc',
        marginHorizontal: 20,
    },
    convertButton: {
        alignItems: 'center',
        margin: -20,
    }
});

/* <Dropdown
          items={Valuutta.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          selectedValue={selectedValuuttaFrom}
          onValueChange={(value) => {
            setSelectedValuuttaFrom(value);
            console.log("Selected 'From' currency:", value);
          }} */

/* <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={fromAmount}
          placeholder="Enter amount"
          onChangeText={(text) => {
            console.log("Entered amount in 'From' currency:", text);
            convertFrom(text);
          }}
        /> */