// src/features/scraping/normalizers.ts
// テキスト正規化の純粋関数。副作用なし・外部依存なし。

// ── 置換テーブル [検索文字列, 置換文字列] ─────────────────────────────────────
// 長いパターンを先に書く（短いパターンが先に一致して長いパターンが機能しなくなるのを防ぐ）。
const REPLACEMENTS: ReadonlyArray<readonly [string, string]> = [

  // GCP サービス名（複合語のスペース問題は単語ごとにつなげた表記を先に処理する）
  ['ネットワーク ロード バランサー',       'Network Load Balancer'          ],
  ['プライベート ホスト ゾーン',           'プライベートホストゾーン'         ],
  ['ソリューション アーキテクト',          'ソリューションアーキテクト'       ],
  ['ネットワーク エンジニア',              'ネットワークエンジニア'           ],
  ['トランジット ゲートウェイ',            'トランジットゲートウェイ'         ],
  ['仮想プライベート ゲートウェイ',        '仮想プライベートゲートウェイ'     ],
  ['エンドポイント サービス',              'エンドポイントサービス'           ],
  ['StackdriverMonitoringAgent',          ' Stackdriver Monitoring Agent '  ],
  ['StackdriverMonitoring',               ' Stackdriver Monitoring '        ],
  ['GoogleKubernetesEngine',              ' Google Kubernetes Engine '      ],
  ['アプリケーション サーバー',            'アプリケーションサーバー'         ],
  ['データ サイエンティスト',              'データサイエンティスト'           ],
  ['データ ストリーム',                   'データストリーム'                 ],
  ['データ センター',                      'データセンター'                  ],
  ['データ ソース',                        'データソース'                    ],
  ['オープン ソース',                      'オープンソース'                  ],
  ['ソース コード',                        'ソースコード'                    ],
  ['エラー メッセージ',                   'エラーメッセージ'                 ],
  ['プル リクエスト',                      'プルリクエスト'                  ],
  ['ファイル サーバー',                   'ファイルサーバー'                 ],
  ['イベント ソース',                      'イベントソース'                  ],
  ['サイトからサイトへのVPN接続',          'Site-to-Site VPN 接続'           ],
  ['管理対象インスタンスグループ',         ' マネージドインスタンスグループ ' ],
  ['グローバル テーブル',                  'グローバルテーブル'              ],
  ['セキュリティ グループ',               'セキュリティグループ'             ],
  ['プライベート サブネット',              'プライベートサブネット'           ],
  ['ターゲット グループ',                  'ターゲットグループ'              ],
  ['ヘルス チェック',                      'ヘルスチェック'                  ],
  ['バケット ポリシー',                   'バケットポリシー'                 ],
  ['ロード バランサー',                   'ロードバランサー'                 ],
  ['ホスト ゾーン',                        'ホストゾーン'                    ],
  ['ルート テーブル',                      'ルートテーブル'                  ],
  ['キー ポリシー',                        'キーポリシー'                    ],
  ['CloudPub/Sub',                        ' Cloud Pub/Sub '                 ],
  ['CloudStorage',                        ' Cloud Storage '                 ],
  ['CloudSpanner',                        ' Cloud Spanner '                 ],
  ['CloudBigtable',                       ' Cloud Bigtable '                ],
  ['CloudFunctions',                      ' Cloud Functions '               ],
  ['CloudFunction',                       ' Cloud Functions'                ],
  ['CloudMonitoring',                     ' Cloud Monitoring '              ],
  ['CloudLogging',                        ' Cloud Logging '                 ],
  ['CloudScheduler',                      ' Cloud Scheduler '               ],
  ['CloudIdentity',                       ' Cloud Identity '                ],
  ['CloudSpanner',                        ' Cloud Spanner '                 ],
  ['CloudBuild',                          ' Cloud Build '                   ],
  ['CloudRun',                            ' Cloud Run '                     ],
  ['CloudSQL',                            ' Cloud SQL '                     ],
  ['CloudVPN',                            ' Cloud VPN '                     ],
  ['AppEngine',                           ' App Engine '                    ],
  ['ComputeEngine',                       ' Compute Engine '                ],
  ['GoogleCloud',                         ' Google Cloud '                  ],
  ['CloudFunction',                       ' Cloud Functions'                ],
  ['GKEクラスター',                       'GKE クラスター'                  ],
  ['Pub / Sub',                           ' Pub/Sub '                       ],
  ['Stackdriver',                         ' Stackdriver '                   ],
  ['Dataproc',                            ' Dataproc '                      ],
  ['Dataflow',                            ' Dataflow '                      ],
  ['BigQuery',                            ' BigQuery '                      ],
  ['Anthos',                              ' Anthos '                        ],
  ['gcloud',                              ' gcloud '                        ],
  ['MySQL',                               ' MySQL '                         ],

  // AWS サービス名
  ['直接接続',                             'Direct Connect '                 ],
  ['ダイレクト コネクト',                  'Direct Connect '                 ],
  ['顧客ゲートウェイ',                    'カスタマーゲートウェイ'           ],
  ['アベイラビリティーゾーン',            'アベイラビリティゾーン'           ],

  // 日本語 → 統一表記
  ['役割',                                 'ロール'                          ],
  ['展開',                                 'デプロイ'                        ],
  ['デプロイメント',                      'デプロイ'                         ],
  ['地域',                                 'リージョン'                      ],
  ['メトリック',                          'メトリクス'                       ],
  ['クラスター',                          'クラスタ'                         ],
  ['コンテナー',                          'コンテナ'                         ],
  ['セキュリティ ',                       'セキュリティ'                     ],
  ['クラウドストレージ',                  ' Cloud Storage '                  ],
  ['クラウドラン',                        ' Cloud Run '                      ],
  ['クラウドスパナー',                    ' Cloud Spanner '                  ],
  ['クラウドVPN',                         ' Cloud VPN '                      ],
  ['クラウドNAT',                         ' Cloud NAT '                      ],
  ['クラウドDNS',                         ' Cloud DNS '                      ],
  ['クラウドルーター',                    ' Cloud Router '                   ],
  ['クラウドアーマー',                    ' Cloud Armor '                    ],
  ['クラウドビルド',                      ' Cloud Build '                    ],
  ['クラウド機能',                        ' Cloud Functions '                ],
  ['クラウドエンドポイント',              ' Cloud Endpoints '                ],
  ['クラウドデータ損失防止',              ' Cloud Data Loss Prevention '     ],
  ['コンテナーレジストリ',                ' Container Registry '             ],
  ['スパナー',                             ' Spanner '                       ],
  ['転送アプライアンス',                  ' Transfer Appliance '             ],
  ['メイビン',                             'Maven'                           ],
  ['竹',                                   'Bamboo'                          ],

  // 半角スペース付与（英数略語）
  ['IPアドレス',                          ' IP アドレス '                    ],
  ['HTTP（S）',                           ' HTTP(S) '                        ],
  ['true',                                 ' true '                          ],
  ['false',                                ' false '                         ],
  ['Linux',                               ' Linux '                          ],
  ['Docker',                              ' Docker '                         ],
  ['Hadoop',                              ' Hadoop '                         ],
  [' Git Hub',                            'GitHub'                           ],
  ['Git',                                 ' Git '                            ],
  ['API',                                 ' API '                            ],
  ['IAM',                                 ' IAM '                            ],
  ['URL',                                 ' URL '                            ],
  ['CPU',                                 ' CPU '                            ],
  ['SSH',                                 ' SSH '                            ],
  ['TCP',                                 ' TCP '                            ],
  ['VPC',                                 ' VPC '                            ],
  ['GCP',                                 ' GCP '                            ],
  ['SSD',                                 ' SSD '                            ],
  ['ETL',                                 ' ETL '                            ],
  ['VM',                                  ' VM '                             ],

  // 句読点後の余分なスペース（最後に処理する）
  ['、 ',                                  '、'                              ],
  ['。 ',                                  '。'                              ],
  ['.  ',                                  '. '                              ],
  ['  ',                                   ' '                               ],

] as const

// ── メイン関数 ────────────────────────────────────────────────────────────────
/**
 * スクレイピングで取得したテキストを正規化する。
 *
 * @param txt - 変換対象の文字列。undefined は空文字として扱う。
 * @returns 正規化済み文字列（前後の空白はトリム済み）
 *
 * @example
 * normalizeText('APIの役割')  // => ' API のロール'
 * normalizeText(undefined)    // => ''
 */
export const normalizeText = (txt?: string): string =>
  REPLACEMENTS
    .reduce((s, [from, to]) => s.replaceAll(from, to), txt ?? '')
    .trim()

// ── テスト用エクスポート ──────────────────────────────────────────────────────
// アンダースコアプレフィックスは「テスト以外からは使用しない」ことを示す慣習。
export const _REPLACEMENTS_FOR_TEST = REPLACEMENTS
