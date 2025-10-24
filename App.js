import { View, StyleSheet, useWindowDimensions, StatusBar, Text } from "react-native";
import Button, { ButtonTypes } from "./Componets/Button";
import { useState } from "react";

const Operators = {
  CLEAR: "C",
  PLUS: "+",
  MINUS: "-",
  EQUAL: "=",
};

const App = () => {
  const windowWidth = useWindowDimensions().width;
  const width = windowWidth / 4 - 1;

  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const onPressNumber = (number) => {
    const last = formula[formula.length - 1];

    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;

        //calculate
      case Operators.EQUAL:
        calculate();
        return;
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
      }
    }
  };

  const calculate = () => {
    let calculateNumber = 0;
    let operator = "";

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculateNumber += value;
        } else if (operator === Operators.MINUS) {
          calculateNumber -= value;
        } else {
          calculateNumber = value;
        }
      }
    });

    setResult(calculateNumber);
    setFormula([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.resultContainer}>
        <Text style={styles.result}>{result.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.left}>
          <View style={styles.numberContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, key) => (
              <Button
                key={key}
                title={num}
                buttonStyle={{ width, height: width }}
                buttonType={ButtonTypes.NUMBER}
                onPress={() => onPressNumber(num)}
              />
            ))}
          </View>

          <View style={[styles.bottomContainer, { height: width }]}>
            <Button
              title={0}
              buttonStyle={{ width: width * 3, height: width }}
              buttonType={ButtonTypes.NUMBER}
              onPress={() => onPressNumber(0)}
            />
          </View>
        </View>

        <View style={[styles.opContainer, { width }]}>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width, height: width }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width, height: width }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width, height: width }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.EQUAL}
            onPress={() => onPressOperator(Operators.EQUAL)}
            buttonStyle={{ width, height: width }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 60,
    justifyContent: "flex-start",
  },
  resultContainer: {
    flex: 0.35,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 25,
    paddingBottom: 10,
  },
  result: {
    fontSize: 48,
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#333",
  },
  left: {
    flex: 1,
  },
  numberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  opContainer: {
    justifyContent: "flex-start",
    backgroundColor: "#1e1e1e",
  },
});
