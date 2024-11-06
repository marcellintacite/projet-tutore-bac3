// DeathCertificate.tsx
"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import logo from "../../../../../public/assets/illustration/jpr.png";
// @ts-ignore
const DeathCertificate = ({ data }) => {
  return (
    <Document
      title={`Certificat de décès de ${data.Certificat.nom_defunt} ${data.Certificat.prenom_defunt}`}
    >
      <Page style={styles.body}>
        <View style={styles.contentContainer}>
          <View style={styles.congo}>
            <Image
              src={window.location.origin + "/assets/illustration/drapeau.png"}
              style={styles.image}
            />
            {/* Text pour le pays */}
            <View style={styles.head}>
              <Text style={styles.title}>REPUBLIQUE DEMOCRATIQUE DU CONGO</Text>
              <Text style={styles.sub}>
                PROVINCE {data.province.denom.toUpperCase()}
              </Text>
              <Text style={styles.sub}>
                MAIRIE DE {data.commune.denom.toUpperCase()}
              </Text>
              <Text style={styles.sub}>
                COMMUNE DE (D') {data.commune.denom.toUpperCase()}
              </Text>
            </View>

            <Image
              src={window.location.origin + "/assets/illustration/jpr.png"}
              style={styles.image}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.normal}>OFFICE DE L'ETAT CIVIL</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.mainTitle}>
              ACTE DE DÉCÈS N° {data.acte.id}
            </Text>
            <Text style={styles.normal}>
              Je soussigné, {data.commune.nom_bour}, officier de l'état civil de
              la commune de {data.commune.denom}, atteste par la présente que le
              (la) défunt(e) nommé(e) {data.Certificat.nom_defunt}{" "}
              {data.Certificat.prenom_defunt} {data.Certificat.post_nom_defunt},
              est décédé(e) le{" "}
              {new Date(data.Certificat.date_deces).toLocaleDateString(
                "fr-FR",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}{" "}
              à {data.Certificat.lieu_deces}.
            </Text>

            <Text style={styles.normal}>
              Cause du décès : {data.Certificat.cause_deces}
            </Text>

            <Text style={styles.normal}>
              Tuteur légal ou contact : {data.Certificat.nom_complet_tuteur}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.normal}>
              Fait à {data.commune.denom}, le{" "}
              {new Date(data.Certificat.date_deces).toLocaleDateString(
                "fr-FR",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Text>
            {data.acte.url_qrcode && (
              <Image style={styles.qrcode} source={data.acte.url_qrcode} />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 25,
    paddingBottom: 65,
    paddingHorizontal: 25,
  },
  congo: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Oswald",
    fontWeight: "bold",
  },
  sub: {
    color: "#000",
    fontWeight: "extrabold",
    textAlign: "center",
    fontFamily: "Oswald",
    fontSize: 14,
  },
  head: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  contentContainer: {
    padding: 14,
    border: "1px solid #000",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  content: {
    marginVertical: 20,
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "underline",
    textAlign: "center",
    marginBottom: 10,
  },
  normal: {
    fontSize: 12,
    marginVertical: 5,
    textAlign: "justify",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  qrcode: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
});

export default DeathCertificate;
