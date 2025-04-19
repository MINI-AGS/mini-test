import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { myDiagnoses } from "../QuestionsScreen/diagnosis";
import styles from "./EndScreen.styles";
import { RootStackParamList } from "../../screens/navigation";

type EndScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EndScreen"
>;

interface EndScreenProps {
  route?: {
    params?: {
      answers?: Record<string, any>;
    };
  };
}

const EndScreen: React.FC<EndScreenProps> = ({ route }) => {
  const navigation = useNavigation<EndScreenNavigationProp>();
  const answers = route?.params?.answers || {};
  const hasDiagnoses = myDiagnoses.some((diagnosis) =>
    diagnosis.dependsOn(answers),
  );

  const handleGoHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name="check-circle" size={80} color="#4CAF50" />
            </View>

            <Text style={styles.title}>¡Proceso Completado!</Text>
            <Text style={styles.subtitle}>
              Gracias por completar el cuestionario.
            </Text>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>
                Tus respuestas han sido registradas correctamente.
              </Text>
              <Text style={styles.summaryText}>
                Un profesional revisará tu caso pronto.
              </Text>

              <View style={styles.diagnosisSection}>
                <Text style={styles.sectionTitle}>Resultados:</Text>

                {hasDiagnoses ? (
                  myDiagnoses.map((diagnosis) => {
                    if (diagnosis.dependsOn(answers)) {
                      return (
                        <View key={diagnosis.id} style={styles.diagnosisItem}>
                          <Text style={styles.diagnosisName}>
                            {diagnosis.name}
                          </Text>
                          {diagnosis.result && (
                            <Text style={styles.diagnosisResult}>
                              {(diagnosis.result as (answers: any) => string)(
                                answers,
                              )}
                            </Text>
                          )}
                        </View>
                      );
                    }
                    return null;
                  })
                ) : (
                  <Text style={styles.noDiagnosisText}>
                    No tienes diagnósticos de momento
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.homeButton}
                onPress={handleGoHome}
              >
                <Text style={styles.homeButtonText}>Regresar al Inicio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EndScreen;
