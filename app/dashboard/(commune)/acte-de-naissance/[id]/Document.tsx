"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Tspan,
  PDFViewer,
} from "@react-pdf/renderer";
import logo from "../../../../../public/assets/illustration/jpr.png";
import { InputesActe } from "@/types/acteType";
import { ResponseActeNaissance } from "@/types/commune";
import { base_url } from "@/data/url";

const Quixote = ({ data }: { data: ResponseActeNaissance }) => {
  const dateOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const link = base_url + data.acte.cod_qr;
  console.log("Lient ", link);
  return (
    <Document
      title={`
    certificat de naissance de ${data.Certificat.nom_enfant} ${data.Certificat.prenom_enfant}}     

    `}
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

          <View style={styles.heade}>
            <Text style={styles.titleUndeline}>
              ACTE DE NAISSANCE N° {data.acte.id}
            </Text>
          </View>
          <View>
            <Text style={styles.normal}>
              Je soussigné, {data.commune.nom_bour} officier de l'Etat Civil et
              Bourgoumestre de la Commune de {data.commune.denom} , ville de{" "}
              {data.terriville.denom}, atteste par la présente que le (la)
              nommé(e) : {data.Certificat.nom_enfant}{" "}
              {data.Certificat.prenom_enfant} {data.Certificat.post_nom_enfant}
            </Text>
            <View style={styles.flex}>
              <Text style={styles.normal}>Fils (fille) de :</Text>
              <Text style={styles.normalBold}>
                {data.Certificat.nom_complet_pere}
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.normal}>Et de :</Text>
              <Text style={styles.normalBold}>
                {data.Certificat.nom_complet_mere}
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.normal}>Originaire de :</Text>
              <Text style={styles.normalBold}>
                {data.Certificat.collectiv_parent}
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.normal}>Chefferie :</Text>
              <Text style={styles.normalBold}>
                {data.Certificat.localite_parent}
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.normal}>Territoire de :</Text>
              <Text style={styles.normalBold}>{data.terriville.denom}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.normal}>Province de :</Text>
              <Text style={styles.normalBold}>{data.province.denom}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.normal}>Est né (e) à :</Text>
              <Text style={styles.normalBold}>
                {data.terriville.denom}, le{" "}
                {new Date(data.Certificat.date_nais_enfant).toLocaleDateString(
                  "fr-FR",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.normal}>
              J'atteste en outre que les reinseignements sont conformes aux
              inscriptions figurant dans les pièces d'identité de l'intéressé ou
              de se parents.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.normale}>
              Fait à {data.commune.denom}, le{" "}
              {new Date(data.Certificat.date_nais_enfant).toLocaleDateString(
                "fr-FR",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Text>
          </View>

          {data.acte.cod_qr && (
            <View style={styles.code}>
              <View style={styles.imgContainer}>
                <Text style={styles.normalBold}>Code QR</Text>
                <Image style={styles.imageQrcode} src={link} source={link} />
              </View>
            </View>
          )}
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
    paddingTop: 25,
    paddingBottom: 65,
    paddingHorizontal: 25,
    position: "relative",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    border: "5px solid #cf3e3e",
    padding: 14,
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
  heade: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginVertical: 10,
  },
  titleUndeline: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Oswald",
    fontWeight: "bold",
    textDecoration: "underline",
  },

  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginVertical: 3,
  },

  author: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    textAlign: "center",
    marginBottom: 8,
    textDecoration: "underline",
  },

  text: {
    margin: 12,
    fontSize: 15,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    width: 80,
  },
  header: {
    fontSize: 12,

    textAlign: "center",
    color: "#7d7879",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  content: {
    marginTop: 40,
  },
  footer: {
    marginTop: 40,
  },
  sceau: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
  },

  normal: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    marginBottom: 3,
  },
  normale: {
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Times-Roman",
    marginBottom: 3,
  },
  normalBold: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Oswald",
    fontWeight: "bold",
  },
  suite: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    marginBottom: 10,
  },

  foot: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#eaf4ff",
    padding: 10,
  },
  code: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 20,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 5,
    border: "1px solid #000",
    borderRadius: 5,
    width: 200,
  },
  imageQrcode: {
    width: 60,
    height: 60,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Quixote;
