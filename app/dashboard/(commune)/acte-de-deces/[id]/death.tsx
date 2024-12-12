"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { ResponseActeNaissance } from "@/types/commune";
import { base_url } from "@/data/url";
import { DeathCertificateData } from "@/app/dashboard/(hopital)/certificat-de-naissance/page";

const ExtraitActeDeces = ({ data }: { data: DeathCertificateData }) => {
  const dateOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const link = base_url + data.acte.cod_qr;

  return (
    <Document
      title={`Extrait de décès de ${data.Certificat.nom_defunt} ${data.Certificat.prenom_defunt}`}
    >
      <Page style={styles.body}>
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            <View style={styles.headerContainer}>
              <Image
                src={
                  window.location.origin + "/assets/illustration/drapeau.png"
                }
                style={styles.image}
              />
              <View style={styles.headerTextContainer}>
                <Text style={styles.title}>
                  REPUBLIQUE DEMOCRATIQUE DU CONGO
                </Text>
                <Text style={styles.subtitle}>
                  PROVINCE {data.province.denom.toUpperCase()}
                </Text>
                <Text style={styles.subtitle}>
                  MAIRIE DE {data.commune.denom.toUpperCase()}
                </Text>
                <Text style={styles.subtitle}>
                  COMMUNE DE {data.commune.denom.toUpperCase()}
                </Text>
              </View>
              <Image
                src={window.location.origin + "/assets/illustration/jpr.png"}
                style={styles.image}
              />
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.officeText}>OFFICE DE L'ETAT CIVIL</Text>
              <Text style={styles.extraitTitle}>
                EXTRAIT D'ACTE DE DECES N° {data.acte.id}
              </Text>
            </View>

            <View style={styles.contentSection}>
              <Text style={styles.contentText}>
                L'an{" "}
                <Text style={styles.bold}>
                  {new Date(data.Certificat.date_desc).getFullYear()}
                </Text>
                , le{" "}
                <Text style={styles.bold}>
                  {new Date(data.Certificat.date_desc).toLocaleDateString(
                    "fr-FR",
                    // @ts-ignore
                    dateOption
                  )}
                </Text>
                , est décédé(e) à{" "}
                <Text style={styles.bold}>{data.terriville.denom}</Text> :
              </Text>
              <Text style={styles.defuntName}>
                <Text style={styles.bold}>
                  {data.Certificat.nom_defunt} {data.Certificat.post_nom_defunt}{" "}
                  {data.Certificat.prenom_defunt}
                </Text>
                , de sexe{" "}
                <Text style={styles.bold}>
                  {data.Certificat.sexe_defunt === "m" ? "masculin" : "féminin"}
                </Text>
                , né(e) le{" "}
                <Text style={styles.bold}>
                  {new Date(
                    data.Certificat.date_naissance_defunt
                    // @ts-ignore
                  ).toLocaleDateString("fr-FR", dateOption)}
                </Text>
                .
              </Text>
              <Text style={styles.contentText}>
                Cause :{" "}
                <Text style={styles.bold}>{data.Certificat.cause_desc}</Text>
              </Text>
              <Text style={styles.contentText}>
                Certificat médical délivré par : Dr.{" "}
                <Text style={styles.bold}>
                  {data.Certificat.medecin_traitant}
                </Text>
              </Text>
            </View>

            <View style={styles.footerSection}>
              <Text style={styles.footerText}>
                Fait à <Text style={styles.bold}>{data.commune.denom}</Text>, le{" "}
                <Text style={styles.bold}>
                  {new Date(data.Certificat.date_desc).toLocaleDateString(
                    "fr-FR",
                    // @ts-ignore
                    dateOption
                  )}
                </Text>
                .
              </Text>
              <Text style={styles.signatureText}>
                L'Officier de l'Etat Civil
              </Text>
              <Text style={styles.signatureText}>{data.commune.nom_bour}</Text>
            </View>

            {data.acte.cod_qr && (
              <View style={styles.qrCodeSection}>
                <Image style={styles.qrCodeImage} src={link} source={link} />
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    height: "full",
    padding: 0,
    margin: 0,
    fontFamily: "Oswald",
  },
  outerBorder: {
    border: "10px solid #cf3e3e",
    padding: 5,
  },
  innerBorder: {
    border: "5px solid #000",
    padding: 10,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #000",
    paddingBottom: 10,
    marginBottom: 10,
    fontFamily: "Oswald",
  },
  image: {
    width: 60,
  },
  headerTextContainer: {
    textAlign: "center",
    fontFamily: "Oswald",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Oswald",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Oswald",
  },
  titleSection: {
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Oswald",
  },
  officeText: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
    fontFamily: "Oswald",
  },
  extraitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "underline",
    fontFamily: "Oswald",
  },
  contentSection: {
    marginBottom: 15,
  },
  contentText: {
    fontSize: 12,
    marginBottom: 5,
    letterSpacing: 1,
    fontFamily: "Oswald",
  },
  defuntName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Oswald",
  },
  footerSection: {
    marginTop: 20,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Oswald",
  },
  signatureText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  qrCodeSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  qrCodeImage: {
    width: 80,
    height: 80,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default ExtraitActeDeces;
